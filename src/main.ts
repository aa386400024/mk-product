import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import router from './router'
import pinia from './stores';
import { setupQiankun } from './plugins/qiankun';
import './permission'


setupQiankun();
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn
})

app.mount('#app')
