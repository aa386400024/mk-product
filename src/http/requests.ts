// src/http/requests.ts
import http from './http';

// 假设 URL 是字符串类型，params 和 data 是任意类型的对象
// 如果您有更确切的类型信息，可以替换 any 为具体的类型

// 定义一个通用的响应类型，这里使用 any 表示任意类型的响应数据
// 如果您知道响应数据的具体结构，可以定义更具体的类型
type ResponseType = any;

export const get = (url: string, params?: any): Promise<ResponseType> => http.get(url, { params });
export const post = (url: string, data?: any): Promise<ResponseType> => http.post(url, data);
export const put = (url: string, data?: any): Promise<ResponseType> => http.put(url, data);
export const del = (url: string): Promise<ResponseType> => http.delete(url);
