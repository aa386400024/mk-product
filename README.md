# mk-product

这个模板应该帮助你开始使用Vue 3在Vite中开发。

## 推荐的IDE设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（禁用Vetur）+ [TypeScript Vue 插件 (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)。

## `.vue` 导入在TS中的类型支持

TypeScript默认无法处理`.vue`导入的类型信息，因此我们用`vue-tsc`替换`tsc` CLI进行类型检查。在编辑器中，我们需要[TypeScript Vue 插件 (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)来使TypeScript语言服务了解`.vue`类型。

如果独立的TypeScript插件对你来说感觉不够快，Volar还实现了一个更高性能的[接管模式](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669)。你可以通过以下步骤启用它：

1. 禁用内置的TypeScript扩展
   1) 从VSCode的命令面板运行`Extensions: Show Built-in Extensions`
   2) 找到`TypeScript and JavaScript Language Features`，右键选择`Disable (Workspace)`
2. 通过运行命令面板中的`Developer: Reload Window`重新加载VSCode窗口。

## 自定义配置

参见 [Vite 配置参考](https://vitejs.dev/config/)。

## 项目设置

```sh
pnpm install
```

### 编译和热重载开发

```sh
pnpm dev
```

### 类型检查、编译和压缩生产

```sh
pnpm build
```

### 使用 [Vitest](https://vitest.dev/) 运行单元测试

```sh
pnpm test:unit
```

### 使用 [ESLint](https://eslint.org/) 进行Lint

```sh
pnpm lint
```

### 新增的详细目录树（部分示例）:

```
my-product
│  .env                        # 环境变量配置文件
│  .env.development            # 开发环境的环境变量配置
│  .env.production             # 生产环境的环境变量配置
│  .eslintrc.cjs               # ESLint配置文件
│  .gitignore                  # Git忽略文件配置
│  .prettierrc.json            # Prettier代码格式化配置文件
│  dist.zip                    # 打包后的文件压缩包
│  env.d.ts                    # 环境变量的TypeScript类型定义
│  floder.txt                  # 未明确用途的文本文件
│  folder.txt                  # 未明确用途的文本文件
│  global.d.ts                 # 全局的TypeScript类型定义
│  index.html                  # 入口HTML文件
│  package.json                # 项目依赖和脚本配置
│  pnpm-lock.yaml              # 依赖锁定文件（pnpm）
│  README.md                   # 项目说明文件
│  tsconfig.app.json           # TypeScript配置（应用）
│  tsconfig.app.tsbuildinfo    # TypeScript构建信息（应用）
│  tsconfig.json               # TypeScript基础配置
│  tsconfig.node.json          # TypeScript配置（Node环境）
│  tsconfig.node.tsbuildinfo   # TypeScript构建信息（Node环境）
│  tsconfig.vitest.json        # TypeScript配置（Vitest）
│  tsconfig.vitest.tsbuildinfo # TypeScript构建信息（Vitest）
│  vite.config.ts              # Vite配置文件
│  vitest.config.ts            # Vitest测试配置文件
│  
├─.vscode
│      extensions.json         # VSCode推荐扩展配置
│      
├─dist
│  │  favicon.ico              # 网站图标
│  │  index.html               # 打包后的入口HTML文件
│  │  
│  └─assets                    # 打包后的静态资源
│          banner-zawCrr9z.png # 示例图片
│          index-oiRsmmg8.js   # 打包后的JavaScript文件
│          index-zzysF_LD.css  # 打包后的CSS文件
│          login-bg-2skNClwQ.jpg # 示例图片
│              
├─public
│      favicon.ico             # 公共网站图标
│      
└─src
    │  App.vue                # 根Vue组件
    │  main.ts                # 应用入口文件
    │  permission.ts          # 路由权限控制逻辑
    │  
    ├─api                     # API接口定义
    │      attendance.ts      # 考勤相关API
    │      auth.js            # 认证相关API
    │      func.ts            # 其他功能API
    │      
    ├─assets                  # 静态资源
    │  ├─fonts                # 字体文件
    │  ├─images               # 图片文件
    │  └─styles               # 样式文件
    │          animations.scss # 动画样式
    │          base.scss       # 基础样式
    │          components.scss # 组件样式
    │          layout.scss     # 布局样式
    │          main.scss       # 主样式文件
    │          mixins.scss     # SASS混入
    │          responsive.scss # 响应式样式
    │          themes.scss     # 主题样式
    │          utilities.scss  # 工具类样式
    │          variables.scss  # SASS变量
    │          
    ├─components              # Vue组件
    │  ├─layout               # 布局相关组件
    │  │      Footer.vue      # 页脚组件
    │  │      index.ts        # 组件导出文件
    │  │      Navbar.vue      # 导航栏组件
    │  │      Sidebar.vue     # 侧边栏组件
    │  │      SidebarMenuItem.vue # 侧边栏菜单项组件
    │  │      
    │  └─login                # 登录相关组件
    ├─http                    # HTTP请求相关
    │      http.ts            # HTTP请求基础配置
    │      interceptors.ts    # HTTP请求拦截器
    │      requests.ts        # HTTP请求方法
    │      
    ├─layouts                 # 布局组件
    │      MainLayout.vue     # 主布局组件
    │      
    ├─router                  # 路由配置
    │      index.ts           # 路由配置文件
    │      
    ├─services                # 服务层
    │      authService.ts     # 认证服务
    │      
    ├─stores                  # 状态管理
    │      userStore.ts       # 用户状态
    │      
    └─views                   # 视图组件
        │  AboutView.vue      # 关于页面视图
        │  HomeView.vue       # 主页视图
        │  
        ├─attendance          # 考勤页面
        │      AttendanceEdit.vue # 考勤编辑页面
        │      
        ├─auth                # 认证页面
        │      AuthLayout.vue     # 认证布局
        │      ForgotPasswordView.vue # 忘记密码页面
        │      LoginView.vue     # 登录页面
        │      RegisterView.vue  # 注册页面
        │      
        └─onePage             # 单页应用示例
                DeleteData.vue   # 数据删除页面
                GetData.vue      # 数据获取页面
```