# 存储API参考

## 存储提供者接口

```typescript
interface StorageProvider {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
}

interface StorageOptions {
  namespace?: string;
  ttl?: number;
  encryption?: {
    enabled: boolean;
    key?: string;
  };
}
```

## 缓存存储

```typescript
class CacheStorageProvider implements StorageProvider {
  constructor(
    primaryStorage: StorageProvider,
    cache: StorageProvider,
    options?: StorageOptions
  );
}
```

## 内存存储

```typescript
class MemoryStorageProvider implements StorageProvider {
  constructor(options?: StorageOptions);
}
```

## 使用示例

```typescript
// 创建存储实例
const storage = new MemoryStorageProvider({
  ttl: 3600000, // 1小时
  encryption: {
    enabled: true
  }
});

// 使用缓存
const cache = new MemoryStorageProvider();
const cachedStorage = new CacheStorageProvider(storage, cache);

// 存储数据
await cachedStorage.set('key', { value: 'data' });
const data = await cachedStorage.get('key');
```
