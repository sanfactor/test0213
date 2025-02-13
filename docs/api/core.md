# 核心API参考

## Plugin 接口

```typescript
interface Plugin {
  id: string;
  version: string;
  activate(): Promise<void>;
  deactivate(): Promise<void>;
}
```

## ContextChain 接口

```typescript
interface ContextChain {
  id: string;
  data: Record<string, any>;
  previous?: ContextChain;
  next?: ContextChain;
}
```

## Pipeline 接口

```typescript
interface Pipeline {
  id: string;
  name: string;
  description?: string;
  triggers: Trigger[];
  actions: Action[];
}
```

## 使用示例

```typescript
import { Plugin, ContextChain, Pipeline } from '@evomind-ai/core';

// 创建插件
class MyPlugin implements Plugin {
  id = 'my-plugin';
  version = '1.0.0';

  async activate(): Promise<void> {
    // 插件激活逻辑
  }

  async deactivate(): Promise<void> {
    // 插件清理逻辑
  }
}

// 使用上下文链
const context: ContextChain = {
  id: 'context-1',
  data: { key: 'value' }
};

// 创建管道
const pipeline: Pipeline = {
  id: 'pipeline-1',
  name: 'My Pipeline',
  triggers: [...],
  actions: [...]
};
```
