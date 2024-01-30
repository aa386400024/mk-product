// src/http/interceptors.ts
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { startLoading, endLoading } from '@/utils/loadingService';
export function setupInterceptors(http: AxiosInstance): void {
    // 请求拦截器
    http.interceptors.request.use(
        (config: AxiosRequestConfig<any>): AxiosRequestConfig<any> => {
            startLoading();
            // 确保 headers 对象存在且不为 undefined
            config.headers = config.headers ?? {};
            const token = localStorage.getItem('token');
            if (token) {
                // 添加 Authorization 头部
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error: AxiosError): Promise<AxiosError> => {
            endLoading();
            return Promise.reject(error);
        }
    );

    // 响应拦截器
    http.interceptors.response.use(
        (response: AxiosResponse): AxiosResponse => {
            endLoading();
            // 处理正常响应
            if (response.data) {
                transformResponseData(response.data);
            }
            return response;
        },
        (error: AxiosError): Promise<AxiosError> => {
            endLoading();
            // 处理错误响应
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        alert("Session expired or user not authenticated.");
                        // 重定向到登录页面等逻辑
                        break;
                    case 403:
                        alert("You do not have permission to access this resource.");
                        break;
                    case 500:
                        alert("Internal Server Error.");
                        break;
                    default:
                        alert(`An error occurred: ${error.response.status}`);
                }
            } else if (error.request) {
                console.log('No response received for the request.');
            } else {
                console.log('Error setting up the request.');
            }

            return Promise.reject(error);
        }
    );
}

// 添加一个用于转换响应数据的函数
function transformResponseData(data: any) {
    if (Array.isArray(data)) {
        data.forEach(item => transformResponseData(item));
    } else if (data !== null && typeof data === 'object') {
        Object.keys(data).forEach(key => {
            if (data[key] === 'None') {
                data[key] = null;  // 将非标准值转换为 null
            } else {
                transformResponseData(data[key]);  // 递归处理
            }
        });
    }
    // 对于基本数据类型（非对象或数组），无需进一步处理
}