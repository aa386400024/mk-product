import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import compression from 'vite-plugin-compression';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        compression(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        ElementPlus({
            useSource: true,
            defaultLocale: 'zh-cn'
        }),
        svgLoader(/* options */)
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @use "@/assets/styles/variables.scss" as *;
                    @use "@/assets/styles/element/index.scss" as *;
                `
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
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
    },
    build: {
        // 添加 build 配置
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        },
        // 可以在这里添加其他 build 相关的配置
        chunkSizeWarningLimit: 600, // 调整警告的代码块大小限制（可选）
    }
})