// src/http/http.js
import axios from 'axios';
import { setupInterceptors } from './interceptors';

const http = axios.create({
    // baseURL: 'https://d276-183-202-73-43.ngrok-free.app/', // 你的 API 基础 URL
    // baseURL: 'https://api.oioweb.cn',
    baseURL: "",
    timeout: 1000 * 60,
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded'
    }
});

// 设置拦截器
setupInterceptors(http);

export default http;
