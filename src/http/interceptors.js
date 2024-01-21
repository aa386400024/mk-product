// src/http/interceptors.js

export function setupInterceptors(http) {
    // 请求拦截器
    http.interceptors.request.use(
        config => {
            // 这里可以添加认证令牌等
            // 例如，如果你使用 JWT：
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            // 处理请求错误
            return Promise.reject(error);
        }
    );

    // 响应拦截器
    http.interceptors.response.use(
        response => {
            // 处理正常响应
            return response;
        },
        error => {
            // 处理错误响应
            // 你可以根据不同的 HTTP 错误码进行不同的处理
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        // 例如，如果用户未授权（401），你可能需要重定向到登录页面
                        alert("Session expired or user not authenticated.");
                        // 重定向到登录页面等逻辑
                        break;
                    case 403:
                        // 处理禁止访问的响应
                        alert("You do not have permission to access this resource.");
                        break;
                    case 500:
                        // 处理服务器错误
                        alert("Internal Server Error.");
                        break;
                    // 其他状态码相关处理
                    default:
                        // 通用错误处理
                        alert(`An error occurred: ${error.response.status}`);
                }
            } else if (error.request) {
                // 请求已发出，但没有收到响应
                console.log('No response received for the request.');
            } else {
                // 设置请求时发生了一些事情
                console.log('Error setting up the request.');
            }

            return Promise.reject(error);
        }
    );
}
