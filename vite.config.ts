import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
        },
    },
    plugins: [ //插件
        vue({
            reactivityTransform: true,//使用ref创建的属性不需要使用value了
        }),
        AutoImport({
            imports: ["vue", "vue-router"], // 自动导入vue和vue-router相关函数
            dts: "src/auto-import.d.ts", // 生成 `auto-import.d.ts` 全局声明
            // resolvers: [ElementPlusResolver()],//element 按需引入
        }),
        Components({
            resolvers: [ElementPlusResolver()],//element 按需引入
        }),
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
