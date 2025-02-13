# 创建插件

本指南将帮助您创建自己的EvoMind插件。

## 使用CLI创建插件

```bash
evomind plugin create my-plugin
```

## 插件结构

```
my-plugin/
├── manifest.json
├── src/
│   ├── index.ts
│   └── types.ts
├── package.json
└── tsconfig.json
```

## 实现插件接口

```typescript
import { Plugin } from '@evomind-ai/core';

export class MyPlugin implements Plugin {
  id = 'my-plugin';
  version = '1.0.0';

  async activate(): Promise<void> {
    // 插件初始化逻辑
  }

  async deactivate(): Promise<void> {
    // 插件清理逻辑
  }
}
```

## 插件配置

manifest.json:
```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "My awesome plugin",
  "main": "dist/index.js",
  "author": "Your Name"
}
```

## 发布插件

1. 构建插件
```bash
npm run build
```

2. 发布到npm
```bash
npm publish
```

## 最佳实践

- 使用TypeScript编写插件
- 提供完整的类型定义
- 实现适当的错误处理
- 添加单元测试
- 编写详细文档
