import { post } from '@/http/requests';

interface Params {
    [key: string]: any; // 这表示一个具有任意键的对象，其值可以是任何类型
}
export const GetAllTypeData = (params: Params): Promise<any> => post('/webapi/GetAllTypeData/', params);
export const UpdateAllTypeData = (params: Params): Promise<any> => post('/webapi/UpdateAllTypeData/', params);
export const DelAllTypeData = (params: Params): Promise<any> => post('/webapi/DelAllTypeData/', params);
export const DataImport = (params: Params): Promise<any> => post('/webapi/DataImport/', params);