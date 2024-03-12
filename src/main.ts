import { createApp } from 'vue'

import './assets/styles/main.scss'
import App from './App.vue'
import router from './router'
import pinia from './stores';
import { setupQiankun } from './plugins/qiankun';
import './permission'
import { SvgIcon } from './components/icons';
import { WebSocketPlugin } from './plugins/websocket-plugin';
import ChatUI from '@springdragon/chat-ui';
// import '@springdragon/chat-ui/lib/style.css';

import '/node_modules/@springdragon/chat-ui/lib/style.css';

const app = createApp(App)

// 全局注册 SvgIcon 组件
app.component('SvgIcon', SvgIcon);

app.use(ChatUI, { defaultTheme: 'dark' });
app.use(pinia)
app.use(router)
app.use(new WebSocketPlugin(), { url: import.meta.env.VITE_SOCKET_IO_URL });
setupQiankun();

app.mount('#app')
