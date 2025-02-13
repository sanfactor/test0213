# EvoMind AI Framework

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

</div>

EvoMind是一个模块化的AI框架，提供灵活、可扩展的人工智能应用开发平台。通过强大的插件系统和多LLM提供商支持，开发者可以快速构建和部署AI应用。

## ✨ 特性

- 🤖 **多LLM支持** - 集成OpenAI、Claude、DeepSeek等多个LLM提供商，支持本地部署
- 🔌 **插件系统** - 灵活的插件架构，支持热插拔和动态加载
- 🎯 **任务编排** - 可视化任务流程设计器，支持复杂工作流
- 💾 **数据存储** - 支持多种存储方式，包括内存存储和缓存
- 🔒 **安全机制** - 内置认证和速率限制功能

## 🚀 快速开始

### 安装

```bash
# 安装CLI工具
npm install -g @evomind-ai/cli

# 创建新项目
evomind init my-project
cd my-project

# 安装依赖
npm install
```

### 配置

创建 `.env` 文件并配置必要的环境变量：

```env
OPENAI_API_KEY=your_api_key
```

### 运行

```bash
# 启动开发服务器
npm run dev
```

## 📦 项目结构

```
evomind-ai/
├── packages/
│   ├── core/          # 核心框架
│   ├── llm/           # LLM集成层
│   ├── plugins/       # 插件系统
│   ├── ui/            # 用户界面组件
│   └── cli/           # 命令行工具
└── docs/              # 文档
```

## 🔧 核心模块

### Core Framework (@evomind-ai/core)

提供框架的核心功能：

```typescript
import { Plugin, ContextChain } from '@evomind-ai/core';

class MyPlugin implements Plugin {
  id = 'my-plugin';
  version = '1.0.0';
  
  async activate(): Promise<void> {
    // 插件初始化逻辑
  }
}
```

### LLM Integration (@evomind-ai/llm)

支持多个LLM提供商：

```typescript
import { LLMProvider } from '@evomind-ai/llm';

const provider = await factory.createProvider('openai', {
  apiKey: 'your-api-key'
});
const response = await provider.generate('Hello');
```

### Plugin System (@evomind-ai/plugins)

灵活的插件管理：

```typescript
import { PluginManager } from '@evomind-ai/plugins';

const manager = new PluginManager();
await manager.loadPlugin(myPlugin, {
  id: 'my-plugin',
  version: '1.0.0'
});
```

## 📚 开发指南

### 构建项目

```bash
npm run build
```

### 运行测试

```bash
npm run test
```

### 文档

详细文档请访问 `docs` 目录或运行：

```bash
cd docs && npm run dev
```

## 🤝 贡献

欢迎提交Pull Request或Issue。在提交PR之前，请确保：

1. 代码通过所有测试
2. 更新相关文档
3. 遵循代码规范

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。
