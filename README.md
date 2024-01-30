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

## 项目命名规范

### 通用规则

| 类型 | 命名规则 | 示例 |
| --- | --- | --- |
| 文件夹 | 使用小写字母和连字符（kebab-case）进行命名，适用于包含多个单词的名称。单一单词的文件夹名称使用全小写字母，不加连字符。 | `user-profile`, `inventory-management`, `assets`, `components`, `stores` |
| Vue 组件文件 | 使用帕斯卡命名法（PascalCase）。 | `UserProfile.vue`, `InventoryList.vue` |
| JavaScript/TypeScript 文件 | 使用小写字母和连字符（kebab-case）进行命名，适用于包含多个单词的名称。单一单词的文件名使用全小写字母，不加连字符。特殊文件（如配置和入口文件）保持通用命名。 | `api-client.ts`, `use-user-profile.ts`, `auth.ts`, `router.ts`, `main.ts`, `vite.config.ts` |
| 样式文件 (CSS/SCSS) | 使用小写字母和连字符（kebab-case）。 | `main-layout.scss`, `variables.scss` |
| CSS 类名 | 使用小写字母和连字符（kebab-case）。 | `main-layout`, `button-styles` |
| 测试文件 | 与其对应的文件名相同，后缀为 `.spec` 或 `.test`。 | `user-profile.spec.ts`, `api-client.test.ts` |
| 类名、接口名和枚举 | 使用帕斯卡命名法（PascalCase）。即使是单一单词，也应首字母大写。对于包含多个单词的名称，每个单词的首字母都大写。 | `User`, `OrderStatus`, `UserInfo`, `ProductDetail` |
| 方法名 (函数名) | 使用驼峰命名法（camelCase）。名称应清晰反映方法的功能和意图。对于布尔值返回的函数，建议使用如 `is`, `can`, `has` 等前缀。 | `getUserInfo()`, `calculateTotalPrice()`, `isLoggedIn()`, `canEdit()` |
| 变量名 | 同样使用驼峰命名法（camelCase）。名称应具有描述性，清楚地表明其代表的内容。对于布尔值变量，建议使用如 `is`, `can`, `has` 等前缀。 | `userName`, `shoppingCart`, `isVisible`, `hasItems` |
| 常量 | 使用全大写字母，单词之间用下划线分隔。 | `MAX_COUNT`, `API_URL` |
| 私有变量和方法 | 对于类的私有变量和方法，我们在名称前加一个下划线以表示其私有性。 | `_privateVar`, `_getPrivateData()` |

### 特定目录规则

| 目录 | 规则 | 示例 |
| --- | --- | --- |
| `src/api` | 包含所有 API 调用相关文件，使用小写字母和连字符命名。 | `reset-password.ts`, `login.ts` |
| `src/assets` | 子目录按资源类型命名，如 `images`, `styles`, `fonts`。 | - |
| `src/components` | 每个组件以帕斯卡命名法命名，如果有子组件，则在父组件的文件夹下创建。 | - |
| `src/views` 和 `src/layouts` | 使用帕斯卡命名法，反映其代表的视图或布局。 | `HomeView.vue`, `MainLayout.vue` |
| `src/stores` | 对于 Pinia store，使用小写字母和连字符命名。 | `user-store.ts` |
| 环境配置文件 | 如 `.env`, `.env.production` 使用小写字母。 | - |

### 特殊文件

- **入口文件**：如 `main.ts`，`index.html` 保持这种通用命名不变。
- **配置文件**：如 `vite.config.ts`, `tsconfig.json` 保持这种通用命名不变。
- **README 和 LICENSE**：使用全大写字母命名。

### 示例摘要

- Vue 组件：`NavBar.vue`, `UserProfile.vue`
- API 文件：`reset-password.ts`, `login.ts`
- CSS/SCSS 文件：`main-layout.scss`, `button-styles.scss`
- 测试文件：`auth-api.spec.ts`, `NavBar.test.ts`

---

### 温馨提示

#### 帕斯卡命名法 vs 驼峰命名法

| 命名法 | 描述 | 示例 |
| --- | --- | --- |
| 帕斯卡命名法（PascalCase） | 每个单词的首字母都大写，包括第一个单词。适用于类名、接口名、枚举等。 | `UserInfo`, `ProductDetail`, `OrderStatus` |
| 驼峰命名法（camelCase） | 第一个单词的首字母小写，后续单词的首字母大写。常用于方法名、变量名。 | `userInfo`, `productDetail`, `orderStatus` |

### 后端数据的处理

在我们的项目中，后端接口可能会返回使用下划线（例如 `total_exchange`）或者其他不符合前端命名规范的数据。对于这种情况，我们的决定是**不进行处理**。

虽然我们可以通过编写转换函数将这些数据转换为符合前端命名规范的格式，但这可能会增加代码的复杂性和出错的风险。因此，我们选择接受后端返回的任何命名规范，以保持代码的简洁性和稳定性。

请注意，这个决定可能会导致前端代码中出现不同的命名规范。但只要我们保持代码的清晰和可维护性，这就不会成为问题。

### Git 分支命名规范

在我们的项目中，我们使用以下规则来命名 Git 分支：

- 功能开发分支：`feature/功能名`
- 修复 bug 的分支：`fix/bug描述`

### 提交信息规范

我们的项目遵循以下提交信息规范：

- 提交信息应简洁明了，清楚地描述每次提交的目的。
- 对于修复 bug 的提交，应在提交信息中提供 bug 的相关信息。
- 对于添加新功能的提交，应在提交信息中描述新功能的主要内容。


## 目录树:

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
    │      user-store.ts       # 用户状态
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