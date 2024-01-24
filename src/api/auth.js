// src/api/auth.js
import { post } from '@/http/requests';

export const login = params => post('/login', params);
export const register = params => post('/register', params);
// 其他认证相关的 API
