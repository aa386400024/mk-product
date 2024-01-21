// src/services/authService.ts
export class AuthService {
    private loggedIn: boolean = false;

    // 假设的登录函数
    login(username: string, password: string): boolean {
        // 这里应该有实际的登录逻辑
        // 暂时假设登录总是成功
        this.loggedIn = true;
        return this.loggedIn;
    }

    // 检查用户是否已登录
    isLoggedIn(): boolean {
        return this.loggedIn;
    }

    // 登出
    logout(): void {
        this.loggedIn = false;
    }
}

// 导出 AuthService 的一个实例
export const authService = new AuthService();
