import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import { setupRouterGuard } from './permission';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// 设置路由守卫
setupRouterGuard(router);


app.mount('#app')
