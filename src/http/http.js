// src/http/http.js
import axios from 'axios';
import { setupInterceptors } from './interceptors';

const http = axios.create({
    baseURL: 'http://your-api-base-url.com', // 你的 API 基础 URL
    timeout: 1000,
    // 可以根据需要添加其他配置，例如 headers
});

// 设置拦截器
setupInterceptors(http);

export default http;
