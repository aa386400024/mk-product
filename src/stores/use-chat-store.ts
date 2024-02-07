// src/stores/use-chat-store.ts
import { defineStore } from 'pinia'

// 定义Message类型
interface Message {
    text: string
    time: string
    isSent: boolean
    avatar: string
}

export const useChatStore = defineStore('chat', {
    state: () => ({
        messages: [] as Message[], // 消息列表
        isConnected: false // WebSocket连接状态
        // 可以根据需要添加更多状态
    }),
    actions: {
        // 添加消息到列表
        addMessage(message: Message) {
            this.messages.push(message)
        },
        // 设置WebSocket连接状态
        setConnected(status: boolean) {
            this.isConnected = status
        }
        // 可以根据需要添加更多actions，例如删除消息、设置用户信息等
    }
})
