import { promises as fs } from 'fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { globby } from 'globby'
import chalk from 'chalk'
import convertToUnixPath from 'slash'
import ora from 'ora'
import imagemin from 'imagemin'
import imageminGifsicle from 'imagemin-gifsicle'
import imageminOptpng from 'imagemin-optipng'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'
import imageminSvgo from 'imagemin-svgo'

// 1. 建立imagemin.map.json缓存表，如果已经处理过，则不再处理，处理过就更新到imagemin.map.json
// 2. 需要覆盖原图，assets/images下有多个文件夹，所以需要解决dest的路径问题，需要用imagemin.buffer来重写
// 3. 有些图片在压缩完之后会变得更大，这种情况不覆盖写入文件，但是要写入缓存文件，且时间戳是旧文件自己的时间戳
// 4. 更多图片类型的插件见 https://github.com/orgs/imagemin/repositories?type=all

// 缓存文件
let cacheFilename = './imagemin.map.json'
// 图片文件目录
const input = ['src/**/*.{jpg,png,svg,gif}']
// 插件
const plugins = [
  imageminGifsicle({
    optimizationLevel: 7,
    interlaced: false
  }),
  imageminOptpng({
    optimizationLevel: 7
  }),
  imageminMozjpeg({
    quality: 80
  }),
  imageminPngquant({
    quality: [0.8, 0.9],
    speed: 4
  }),
  imageminSvgo({
    plugins: [
      {
        name: 'removeViewBox'
      },
      {
        name: 'removeEmptyAttrs',
        active: false
      }
    ]
  })
]
const debug = false
let tinyMap = new Map()
let filePaths = []
let cache, cachePath
let handles = []
let time
const spinner = ora('图片压缩中...')
;(async () => {
  console.log('开始执行')
  const unixFilePaths = input.map((path) => convertToUnixPath(path))
  cachePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), cacheFilename)
  cache = await fs.readFile(cachePath)
  cache = JSON.parse(cache.toString() || '{}')
  // 通过通配符匹配文件路径
  filePaths = await globby(unixFilePaths, { onlyFiles: true })
  // 如果文件不在imagemin.map.json上，则加入队列；
  // 如果文件在imagemin.map.json上，且修改时间不一致，则加入队列；
  filePaths = await filter(filePaths, async (filePath) => {
    let ctimeMs = cache[filePath]
    let mtimeMs = (await fs.stat(filePath)).mtimeMs
    if (!ctimeMs) {
      debug && console.log(filePath + '不在缓存入列')
      tinyMap.set(filePath, {
        mtimeMs
      })
      return true
      // 系统时间戳，比Date.now()更精准，多了小数点后三位，所以控制在1ms内都认为是有效缓存
    } else {
      if (Math.abs(ctimeMs - mtimeMs) > 1) {
        debug &&
          console.log(`
          ${filePath}在缓存但过期了而入列，${ctimeMs} ${mtimeMs} 相差${ctimeMs - mtimeMs}`)
        tinyMap.set(filePath, {
          mtimeMs
        })
        return true
      } else {
        // debug && console.log(filePath + '在缓存而出列');
        return false
      }
    }
  })
  debug && console.log(filePaths)
  await processFiles()
})()

// 处理单个文件，调用imagemin.buffer处理
async function processFile(filePath) {
  let buffer = await fs.readFile(filePath)
  let content
  try {
    content = await imagemin.buffer(buffer, {
      plugins
    })

    const size = content.byteLength,
      oldSize = buffer.byteLength

    if (tinyMap.get(filePath)) {
      tinyMap.set(filePath, {
        ...tinyMap.get(filePath),
        size: size / 1024,
        oldSize: oldSize / 1024,
        ratio: size / oldSize - 1
      })
    } else {
      tinyMap.set(filePath, {
        size: size / 1024,
        oldSize: oldSize / 1024,
        ratio: size / oldSize - 1
      })
    }
    return content
  } catch (error) {
    console.log(error)
    console.error('imagemin error:' + filePath)
  }
}

// 批量处理
async function processFiles() {
  if (!filePaths.length) {
    return
  }
  spinner.start()
  time = Date.now()
  handles = filePaths.map(async (filePath) => {
    let content = await processFile(filePath)
    return {
      filePath,
      content
    }
  })
  handles = await Promise.all(handles)
  await generateFiles()
}

// 生成文件并覆盖源文件
async function generateFiles() {
  if (handles.length) {
    handles = handles.map(async (item) => {
      const { filePath, content } = item
      if (content) {
        if (tinyMap.get(filePath).ratio < 0) {
          await fs.writeFile(filePath, content)
          cache[filePath] = Date.now()
        } else {
          // 存在压缩之后反而变大的情况，这种情况不覆盖原图，但会记录到缓存表中，且记录的时间戳是旧文件自己的时间戳
          cache[filePath] = tinyMap.get(filePath).mtimeMs
        }
      }
    })
    handles = await Promise.all(handles)
    handleOutputLogger()
    generateCache()
  }
}

// 生成缓存文件
async function generateCache() {
  await fs.writeFile(cachePath, Buffer.from(JSON.stringify(cache)), {
    encoding: 'utf-8'
  })
}

// 输出结果
function handleOutputLogger() {
  spinner.stop()
  console.info('图片压缩成功')
  time = (Date.now() - time) / 1000 + 's'
  const keyLengths = Array.from(tinyMap.keys(), (name) => name.length)
  const valueLengths = Array.from(
    tinyMap.values(),
    (value) => `${Math.floor(100 * value.ratio)}`.length
  )

  const maxKeyLength = Math.max(...keyLengths)
  const valueKeyLength = Math.max(...valueLengths)
  tinyMap.forEach((value, name) => {
    let { ratio } = value
    const { size, oldSize } = value
    ratio = Math.floor(100 * ratio)
    const fr = `${ratio}`

    // 存在压缩之后反而变大的情况，这种情况不覆盖原图，所以这种情况显示0%
    const denseRatio =
      ratio > 0
        ? // ? chalk.red(`+${fr}%`)
          chalk.green(`0%`)
        : ratio <= 0
        ? chalk.green(`${fr}%`)
        : ''

    const sizeStr =
      ratio <= 0
        ? `${(oldSize * 1).toFixed(2)}kb / tiny: ${(size * 1).toFixed(2)}kb`
        : `${(oldSize * 1).toFixed(2)}kb / tiny: ${(oldSize * 1).toFixed(2)}kb`

    console.info(
      chalk.dim(
        chalk.blueBright(name) +
          ' '.repeat(2 + maxKeyLength - name.length) +
          chalk.gray(`${denseRatio} ${' '.repeat(valueKeyLength - fr.length)}`) +
          ' ' +
          chalk.dim(sizeStr)
      )
    )
  })
  console.info('图片压缩总耗时', time)
}

// filter不支持异步处理，用map来模拟filter
// https://stackoverflow.com/questions/33355528/filtering-an-array-with-a-function-that-returns-a-promise/46842181#46842181
async function filter(arr, callback) {
  const fail = Symbol()
  return (
    await Promise.all(arr.map(async (item) => ((await callback(item)) ? item : fail)))
  ).filter((i) => i !== fail)
}
