# 🗳️ Community Poll System

一个现代化的社区投票系统前端项目，基于 Vue 3 和 Vite 构建，提供直观的用户界面和丰富的投票功能。

## ✨ 特性

- 📊 支持多种投票类型（单选、二分选项、多选）
- 👥 用户管理系统
- 📈 使用 ECharts 进行数据可视化
- 🎨 基于 Element Plus 的现代化 UI 设计
- 🚀 使用 Vite 实现快速的开发体验

## 🛠️ 技术栈

- Vue 3
- Vite
- Vue Router
- Element Plus
- ECharts
- Axios

## 📦 安装

```bash
# 克隆项目
git clone [项目地址]

# 进入项目目录
cd front

# 安装依赖
npm install
```

## 🚀 使用

### 开发环境

```bash
npm run dev
```

### 生产环境构建

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 💡 主要功能

- 创建投票：支持创建不同类型的投票（单选、二分选项、多选）
- 投票管理：查看、修改和删除投票
- 用户系统：支持用户注册、登录和权限管理
- 数据统计：使用 ECharts 展示投票结果和统计数据

## 🔧 项目结构

```
src/
├── api/        # API 接口
├── component/  # 通用组件
├── router/     # 路由配置
├── util/       # 工具函数
├── view/       # 页面组件
└── App.vue     # 根组件
```

## 📝 开发指南

1. 所有 API 请求都在 `src/api` 目录下管理
2. 通用组件放在 `src/component` 目录下
3. 页面组件位于 `src/view` 目录
4. 工具函数和请求封装在 `src/util` 目录

## 🤝 贡献

欢迎提交问题和改进建议！

## 📄 许可证

[MIT License](LICENSE)
