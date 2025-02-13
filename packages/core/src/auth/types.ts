export interface AuthCredentials {
  type: string;
  [key: string]: any;
}

export interface AuthToken {
  token: string;
  expiresAt: number;
  userId: string;
  permissions: string[];
}

export interface AuthProvider {
  authenticate(credentials: AuthCredentials): Promise<AuthToken>;
  validate(token: string): Promise<boolean>;
  refresh(token: string): Promise<AuthToken>;
  revoke(token: string): Promise<void>;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export interface RateLimiter {
  isLimited(key: string): Promise<boolean>;
  increment(key: string): Promise<void>;
  reset(key: string): Promise<void>;
}
