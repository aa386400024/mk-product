// src/api/func.js
import { post } from '@/http/requests';

export const generateData = params => post('/webapi/GenerateData/', params);
export const addMoreData = params => post('/webapi/AddMoreData/', params);
export const delMoreData = params => post('/webapi/DelMoreData/', params);
export const GetStationInfo = params => post('/webapi/GetStationInfo/', params);
// 其他认证相关的 API
