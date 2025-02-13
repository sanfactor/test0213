import { RateLimiter, RateLimitConfig } from './types';

export class MemoryRateLimiter implements RateLimiter {
  private requests: Map<string, { count: number; resetAt: number }>;
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.requests = new Map();
    this.config = config;
  }

  async isLimited(key: string): Promise<boolean> {
    const now = Date.now();
    const data = this.requests.get(key);

    if (!data) return false;
    if (data.resetAt <= now) {
      this.requests.delete(key);
      return false;
    }

    return data.count >= this.config.maxRequests;
  }

  async increment(key: string): Promise<void> {
    const now = Date.now();
    const data = this.requests.get(key);

    if (!data || data.resetAt <= now) {
      this.requests.set(key, {
        count: 1,
        resetAt: now + this.config.windowMs
      });
      return;
    }

    data.count++;
  }

  async reset(key: string): Promise<void> {
    this.requests.delete(key);
  }
}
