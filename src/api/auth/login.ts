import { post } from '@/http/requests';

interface Params {
    [key: string]: any; // 这表示一个具有任意键的对象，其值可以是任何类型
}
export const login = (params: Params): Promise<any> => post('/login', params);
