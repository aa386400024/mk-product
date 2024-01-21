// src/api/auth.js
import { post } from '@/http/requests';

export const login = credentials => post('/login', credentials);
export const register = data => post('/register', data);
// 其他认证相关的 API
