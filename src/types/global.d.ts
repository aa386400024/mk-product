// global.d.ts

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 添加对环境变量的类型定义
interface ImportMetaEnv {
    readonly BASE_URL: string;
    // 在这里可以添加更多的环境变量
    // 例如:
    // readonly VITE_SOME_API_KEY: string;
}

// 扩展 ImportMeta 接口
interface ImportMeta {
    readonly env: ImportMetaEnv;
    glob(pattern: string): Record<string, () => Promise<any>>;
}
