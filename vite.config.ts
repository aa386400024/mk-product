import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';

// 或者使用 unplugin-element-plus
import ElementPlus from 'unplugin-element-plus/vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        ElementPlus({
            useSource: true,
            defaultLocale: 'zh-cn'
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        svgLoader(/* options */)
    ],
    css: {
        preprocessorOptions: {
            scss: {
                // 全局使用样式变量
                //确保你的自定义SCSS变量在每个组件中都被应用
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
        // chunkSizeWarningLimit: 1000, // 调整警告的代码块大小限制（可选）
    }
})
