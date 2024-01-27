import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist';
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import { setupRouterGuard } from './permission'

const app = createApp(App)

const pinia = createPinia();

pinia.use(piniaPluginPersist);
app.use(pinia);
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})

// 设置路由守卫
setupRouterGuard(router)

app.mount('#app')
