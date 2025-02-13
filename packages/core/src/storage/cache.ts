import { StorageProvider, StorageOptions, StorageEvent, StorageObserver } from './types';

export class CacheStorageProvider implements StorageProvider, StorageObserver {
  private primaryStorage: StorageProvider;
  private cache: StorageProvider;
  private options: StorageOptions;

  constructor(
    primaryStorage: StorageProvider,
    cache: StorageProvider,
    options: StorageOptions = {}
  ) {
    this.primaryStorage = primaryStorage;
    this.cache = cache;
    this.options = options;

    if ('addObserver' in primaryStorage) {
      (primaryStorage as any).addObserver(this);
    }
  }

  async connect(): Promise<void> {
    await Promise.all([
      this.primaryStorage.connect(),
      this.cache.connect()
    ]);
  }

  async disconnect(): Promise<void> {
    await Promise.all([
      this.primaryStorage.disconnect(),
      this.cache.disconnect()
    ]);
  }

  async get<T>(key: string): Promise<T | null> {
    // Try cache first
    const cached = await this.cache.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    // If not in cache, get from primary storage
    const value = await this.primaryStorage.get<T>(key);
    if (value !== null) {
      // Update cache
      await this.cache.set(key, value);
    }

    return value;
  }

  async set<T>(key: string, value: T): Promise<void> {
    await Promise.all([
      this.primaryStorage.set(key, value),
      this.cache.set(key, value)
    ]);
  }

  async delete(key: string): Promise<void> {
    await Promise.all([
      this.primaryStorage.delete(key),
      this.cache.delete(key)
    ]);
  }

  async clear(): Promise<void> {
    await Promise.all([
      this.primaryStorage.clear(),
      this.cache.clear()
    ]);
  }

  async keys(): Promise<string[]> {
    return this.primaryStorage.keys();
  }

  onStorageEvent(event: StorageEvent): void {
    switch (event.type) {
      case 'set':
        if (event.key && event.value) {
          this.cache.set(event.key, event.value).catch(console.error);
        }
        break;
      case 'delete':
        if (event.key) {
          this.cache.delete(event.key).catch(console.error);
        }
        break;
      case 'clear':
        this.cache.clear().catch(console.error);
        break;
    }
  }
}
