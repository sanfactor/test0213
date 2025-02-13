# 认证API参考

## 认证接口

```typescript
interface AuthCredentials {
  type: string;
  [key: string]: any;
}

interface AuthToken {
  token: string;
  expiresAt: number;
  userId: string;
  permissions: string[];
}

interface AuthProvider {
  authenticate(credentials: AuthCredentials): Promise<AuthToken>;
  validate(token: string): Promise<boolean>;
  refresh(token: string): Promise<AuthToken>;
  revoke(token: string): Promise<void>;
}
```

## 速率限制

```typescript
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface RateLimiter {
  isLimited(key: string): Promise<boolean>;
  increment(key: string): Promise<void>;
  reset(key: string): Promise<void>;
}
```

## 使用示例

```typescript
// 基础认证
const authProvider = new BasicAuthProvider();

// 添加用户
await authProvider.addUser('user1', 'password123', ['read', 'write']);

// 认证
const token = await authProvider.authenticate({
  type: 'basic',
  userId: 'user1',
  password: 'password123'
});

// 验证token
const isValid = await authProvider.validate(token.token);

// 速率限制
const rateLimiter = new MemoryRateLimiter({
  windowMs: 15 * 60 * 1000, // 15分钟
  maxRequests: 100
});

const isLimited = await rateLimiter.isLimited('user1');
```
