import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import router from './router'
import pinia from './stores';
import { registerMicroApps, start } from 'qiankun'
import './permission'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn
})

// 注册子应用
registerMicroApps([
    {
        name: '子应用名称', // 子应用的名称
        entry: '//localhost:子应用端口', // 子应用的入口
        container: '#子应用容器', // 子应用挂载的容器
        activeRule: '/子应用路由前缀' // 子应用激活的规则
    }
    // 可以注册多个子应用
])

// 启动 Qiankun
start()

app.mount('#app')
