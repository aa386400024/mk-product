// src/http/requests.js
import http from './http';

export const get = (url, params) => http.get(url, { params });
export const post = (url, data) => http.post(url, data);
export const put = (url, data) => http.put(url, data);
export const del = (url) => http.delete(url);
