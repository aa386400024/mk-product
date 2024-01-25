// src/http/http.ts
import axios, { type AxiosInstance } from 'axios';
import { setupInterceptors } from './interceptors';

// 定义 HTTP 实例配置的接口
interface HttpConfig {
    baseURL: string;
    timeout: number;
    headers: {
        'Content-Type': string;
    };
}

// 创建配置对象
const config: HttpConfig = {
    baseURL: "", // 您的 API 基础 URL
    timeout: 1000 * 60,
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded'
    }
};

// 创建 axios 实例
const http: AxiosInstance = axios.create(config);

// 设置拦截器
setupInterceptors(http);

export default http;
