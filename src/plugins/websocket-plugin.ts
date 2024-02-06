import { io, Socket } from 'socket.io-client';
import { useChatStore } from '@/stores/use-chat-store';
import type { App } from 'vue';

export class WebSocketPlugin {
    private socket: Socket | null = null;
    private url: string; // 存储连接URL

    constructor(url?: string) {
        this.url = url ?? '';
    }

    install(app: App, { url = '' } = {}) {
        if (url) this.url = url;
        app.config.globalProperties.$socket = this;
        app.provide('socket', this);
    }

    connect(url?: string) {
        if (url) this.url = url;
        if (!this.url) throw new Error('WebSocket URL not provided.');

        if (!this.socket) {
            this.socket = io(this.url, {
                reconnection: true, // 启用自动重连
                reconnectionAttempts: 3, // 无限重连尝试
                reconnectionDelay: 1000, // 初始重连延迟为1秒
                reconnectionDelayMax: 5000, // 最大重连延迟为5秒
                randomizationFactor: 0.5, // 重连延迟随机化因子
            });
            this.setupListeners();
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    private setupListeners() {
        const store = useChatStore();
    
        this.socket?.on('connect', () => {
            console.log('WebSocket Connected');
            store.setConnected(true);
        });
    
        this.socket?.on('disconnect', () => {
            console.log('WebSocket Disconnected');
            store.setConnected(false);
        });
    
        this.socket?.on('message', (message) => {
            store.addMessage(message);
        });
    
        // 监听重连尝试
        this.socket?.on('reconnect_attempt', () => {
            console.log('Attempting to reconnect...');
        });
    
        // 监听重连失败
        this.socket?.on('reconnect_failed', () => {
            console.log('Reconnect failed after several attempts');
        });
    
        // 监听重连错误
        this.socket?.on('reconnect_error', (error) => {
            console.error('Reconnect error:', error);
        });
    
        // 监听成功重连
        this.socket?.on('reconnect', (attemptNumber) => {
            console.log(`Successfully reconnected on attempt ${attemptNumber}`);
            store.setConnected(true);
        });
    }    

    sendMessage(message: any) {
        if (this.socket) {
            this.socket.emit('message', message);
        }
    }

    getSocket(): Socket | null {
        return this.socket;
    }
}
