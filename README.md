# EvoMind AI Framework

EvoMind是一个模块化的AI框架，支持多LLM提供商集成和灵活的插件系统。

## 特性

- 多LLM提供商支持 (OpenAI, Claude, DeepSeek)
- 插件化架构
- 任务编排界面
- 本地部署支持
- 数据存储与同步
- 基础安全特性

## 项目结构

- packages/core: 核心框架
- packages/llm: LLM提供商集成
- packages/plugins: 插件系统
- packages/ui: 用户界面
- packages/cli: 命令行工具
- docs: 项目文档

## 开发指南

### 安装依赖
```bash
npm install
```

### 构建项目
```bash
npm run build
```

### 运行测试
```bash
npm run test
```

## 许可证

MIT
