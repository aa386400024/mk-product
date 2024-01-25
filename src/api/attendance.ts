// src/api/attendance.ts
import { post } from '@/http/requests';

// 定义 params 的结构，如果有更多的属性，您可以在这里添加
interface Params {
    [key: string]: any; // 这表示一个具有任意键的对象，其值可以是任何类型
}

// 每个函数都返回一个 Promise，此处假设为 Promise<any>，
// 如果您知道具体的返回类型，可以替换 any 为具体类型
export const HistoryInwellRecord = (params: Params): Promise<any> => post('/webapi/HistoryInwellRecord/', params);
export const HistoryInwellRecordPreview = (params: Params): Promise<any> => post('/webapi/HistoryInwellRecordPreview/', params);
export const HistoryInwellRecordConfim = (params: Params): Promise<any> => post('/webapi/HistoryInwellRecordConfim/', params);
// 其他认证相关的 API
