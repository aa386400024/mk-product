// src/http/http.ts
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { setupInterceptors } from './interceptors';


// 创建配置对象
const config = {
    baseURL: "", // 您的 API 基础 URL
    timeout: 1000 * 60,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
};

// 创建 axios 实例
const http: AxiosInstance = axios.create(config);

// 设置拦截器
setupInterceptors(http);

export default http;
