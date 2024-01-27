import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/styles/variables.scss";` // 全局使用样式变量
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // server: {
    //     proxy: {
    //         '/webapi/': {
    //             target: 'https://api.oioweb.cn/',
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace(/^\/webapi/, '')
    //         }
    //     }
    // },
    server: { 
        host: '0.0.0.0',
        // port: 3000,
        open: true,
        proxy: {
          '/webapi': {
            target: 'https://376b-223-160-141-68.ngrok-free.app/',	//接口地址
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/webapi/, 'webapi')
          },
        }
    }
})
