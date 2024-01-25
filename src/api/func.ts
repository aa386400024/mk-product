// src/api/func.ts
import { post, get } from '@/http/requests';

// 定义 params 的结构，如果有更多的属性，您可以在这里添加
interface Params {
    [key: string]: any; // 这表示一个具有任意键的对象，其值可以是任何类型
}

// 每个函数都返回一个 Promise，此处假设为 Promise<any>，
// 如果您知道具体的返回类型，可以替换 any 为具体类型
export const generateData = (params: Params): Promise<any> => post('/webapi/GenerateData/', params);
export const addMoreData = (params: Params): Promise<any> => post('/webapi/AddMoreData/', params);
export const delMoreData = (params: Params): Promise<any> => post('/webapi/DelMoreData/', params);
export const GetStationInfo = (params: Params): Promise<any> => get('/webapi/GetStationInfo/', params);
// 其他认证相关的 API
