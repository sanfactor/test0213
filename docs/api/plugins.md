# 插件API参考

## 插件接口

```typescript
interface Plugin {
  id: string;
  version: string;
  activate(): Promise<void>;
  deactivate(): Promise<void>;
}

interface PluginMetadata {
  id: string;
  version: string;
  name: string;
  description?: string;
  author?: string;
  dependencies?: Record<string, string>;
}

interface PluginEvent {
  type: string;
  payload: any;
  source: string;
  timestamp: Date;
}
```

## 插件管理器

```typescript
class PluginManager {
  async loadPlugin(plugin: Plugin, metadata: PluginMetadata): Promise<void>;
  async unloadPlugin(pluginId: string): Promise<void>;
  async reloadPlugin(pluginId: string): Promise<void>;
  getPlugin(pluginId: string): ExtendedPlugin | undefined;
  getAllPlugins(): ExtendedPlugin[];
}
```

## 事件系统

```typescript
interface PluginContext {
  emit(event: PluginEvent): Promise<void>;
  on(eventType: string, handler: PluginEventHandler): void;
  off(eventType: string, handler: PluginEventHandler): void;
}
```

## 使用示例

```typescript
// 创建插件
class MyPlugin implements Plugin {
  id = 'my-plugin';
  version = '1.0.0';

  async activate(): Promise<void> {
    // 初始化逻辑
  }

  async deactivate(): Promise<void> {
    // 清理逻辑
  }
}

// 加载插件
const pluginManager = new PluginManager();
await pluginManager.loadPlugin(myPlugin, {
  id: 'my-plugin',
  version: '1.0.0',
  name: 'My Plugin'
});

// 使用事件系统
myPlugin.context?.on('custom-event', async (event) => {
  console.log('Received event:', event);
});
```
