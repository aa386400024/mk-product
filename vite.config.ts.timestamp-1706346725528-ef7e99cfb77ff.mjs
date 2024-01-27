// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///E:/my-project/front-project/mk-product/node_modules/.pnpm/vite@5.0.12_@types+node@18.19.8_sass@1.70.0/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/my-project/front-project/mk-product/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@5.0.12_vue@3.4.15/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///E:/my-project/front-project/mk-product/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.0.12_vue@3.4.15/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///E:/my-project/front-project/mk-product/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/variables.scss";`
        // 全局使用样式变量
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
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
    host: "0.0.0.0",
    // port: 3000,
    open: true,
    proxy: {
      "/webapi": {
        target: "https://4638-183-202-73-43.ngrok-free.app/",
        //接口地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/webapi/, "webapi")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxteS1wcm9qZWN0XFxcXGZyb250LXByb2plY3RcXFxcbWstcHJvZHVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcbXktcHJvamVjdFxcXFxmcm9udC1wcm9qZWN0XFxcXG1rLXByb2R1Y3RcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L215LXByb2plY3QvZnJvbnQtcHJvamVjdC9tay1wcm9kdWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICB2dWUoKSxcbiAgICAgICAgdnVlSnN4KCksXG4gICAgXSxcbiAgICBjc3M6IHtcbiAgICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICAgICAgc2Nzczoge1xuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIkAvYXNzZXRzL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiO2AgLy8gXHU1MTY4XHU1QzQwXHU0RjdGXHU3NTI4XHU2ODM3XHU1RjBGXHU1M0Q4XHU5MUNGXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIHNlcnZlcjoge1xuICAgIC8vICAgICBwcm94eToge1xuICAgIC8vICAgICAgICAgJy93ZWJhcGkvJzoge1xuICAgIC8vICAgICAgICAgICAgIHRhcmdldDogJ2h0dHBzOi8vYXBpLm9pb3dlYi5jbi8nLFxuICAgIC8vICAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAvLyAgICAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvd2ViYXBpLywgJycpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyB9LFxuICAgIHNlcnZlcjogeyBcbiAgICAgICAgaG9zdDogJzAuMC4wLjAnLFxuICAgICAgICAvLyBwb3J0OiAzMDAwLFxuICAgICAgICBvcGVuOiB0cnVlLFxuICAgICAgICBwcm94eToge1xuICAgICAgICAgICcvd2ViYXBpJzoge1xuICAgICAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly80NjM4LTE4My0yMDItNzMtNDMubmdyb2stZnJlZS5hcHAvJyxcdC8vXHU2M0E1XHU1M0UzXHU1NzMwXHU1NzQwXG4gICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvd2ViYXBpLywgJ3dlYmFwaScpXG4gICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRTLFNBQVMsZUFBZSxXQUFXO0FBRS9VLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFKd0ssSUFBTSwyQ0FBMkM7QUFPNU8sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLEVBQ1g7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNELHFCQUFxQjtBQUFBLE1BQ2pCLE1BQU07QUFBQSxRQUNGLGdCQUFnQjtBQUFBO0FBQUEsTUFDcEI7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN4RDtBQUFBLEVBQ0o7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVVBLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQTtBQUFBLElBRU4sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsV0FBVztBQUFBLFFBQ1QsUUFBUTtBQUFBO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsYUFBYSxRQUFRO0FBQUEsTUFDdkQ7QUFBQSxJQUNGO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
