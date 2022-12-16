import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'
import visualizer from 'rollup-plugin-visualizer'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2015',
    assetsDir: './static',
    chunkSizeWarningLimit: 500,
    minify: 'terser',
    cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    terserOptions: {
      compress: {
        // warnings: false,
        drop_console: true, //打包时删除console
        drop_debugger: true, //打包时删除 debugger
        pure_funcs: ['console.log']
      },
      output: {
        // 去掉注释内容
        comments: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
          vue: ['vue', 'vue-router']
          // echarts: ['echarts'],
        }
      }
    },
    brotliSize: false
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  plugins: [
    //插件
    vue({
      reactivityTransform: true //使用ref创建的属性不需要使用value了
    }),
    AutoImport({
      imports: ['vue', 'vue-router'], // 自动导入vue和vue-router相关函数
      dts: 'src/auto-import.d.ts' // 生成 `auto-import.d.ts` 全局声明
      // resolvers: [ElementPlusResolver()],//element 按需引入
    }),
    Components({
      resolvers: [ElementPlusResolver()] //element 按需引入
    }),
    viteCompression({
      //gzip压缩文件
      verbose: true, //是否在控制台输出压缩结果
      disable: false, //是否禁用,相当于开关在这里
      threshold: 10240, //体积大于 threshold 才会被压缩,单位 b，1b=8B, 1B=1024KB  那我们这里相当于 9kb多吧，就会压缩
      algorithm: 'gzip', //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: '.gz' //文件后缀
    }),
    viteImagemin({
      //图片压缩，配合脚本使用更加快
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 20
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    visualizer({
      //打包配置分析工具
      emitFile: true, //是否被触摸
      filename: 'test.html', //生成分析网页文件名
      open: true, //在默认用户代理中打开生成的文件
      gzipSize: true, //从源代码中收集 gzip 大小并将其显示在图表中
      brotliSize: true //从源代码中收集 brotli 大小并将其显示在图表中
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/main.scss";'
      }
    }
  },
  server: {
    host: '10.101.196.121'
  }
})
