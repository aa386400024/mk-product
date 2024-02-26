/// <reference types="vite/client" />

// 扩展 ImportMetaEnv 接口
interface ImportMetaEnv {
    readonly VITE_SOCKET_IO_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
