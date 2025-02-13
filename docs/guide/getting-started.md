# 快速开始

本指南将帮助您快速上手EvoMind AI框架。

## 安装

使用npm安装EvoMind CLI：

```bash
npm install -g @evomind-ai/cli
```

## 创建新项目

```bash
evomind init my-project
cd my-project
```

## 配置

创建配置文件 `.env`：

```env
OPENAI_API_KEY=your_api_key
```

## 运行

启动开发服务器：

```bash
npm run dev
```

## 创建插件

使用CLI创建新插件：

```bash
evomind plugin create my-plugin
```

## 下一步

- 阅读[核心概念](./core-concepts.md)了解更多框架细节
- 查看[插件开发指南](../plugins/creating-plugins.md)学习如何开发插件
- 浏览[API文档](../api/core.md)获取详细API信息
