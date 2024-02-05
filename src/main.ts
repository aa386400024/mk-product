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
import { SvgIcon } from './components/icons';

const app = createApp(App)

// 全局注册 SvgIcon 组件
app.component('SvgIcon', SvgIcon);

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn
})
setupQiankun();

app.mount('#app')
