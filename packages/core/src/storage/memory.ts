import { StorageProvider, StorageOptions, StorageEvent, StorageObserver } from './types';

export class MemoryStorageProvider implements StorageProvider {
  private storage: Map<string, { value: any; timestamp: number }>;
  private observers: Set<StorageObserver>;
  private options: StorageOptions;

  constructor(options: StorageOptions = {}) {
    this.storage = new Map();
    this.observers = new Set();
    this.options = options;
  }

  async connect(): Promise<void> {
    // Memory storage is always connected
  }

  async disconnect(): Promise<void> {
    // Memory storage doesn't need disconnection
  }

  async get<T>(key: string): Promise<T | null> {
    const entry = this.storage.get(key);
    if (!entry) return null;

    if (this.options.ttl && Date.now() - entry.timestamp > this.options.ttl) {
      await this.delete(key);
      return null;
    }

    return entry.value as T;
  }

  async set<T>(key: string, value: T): Promise<void> {
    const timestamp = Date.now();
    this.storage.set(key, { value, timestamp });
    this.notifyObservers({ type: 'set', key, value, timestamp });
  }

  async delete(key: string): Promise<void> {
    this.storage.delete(key);
    this.notifyObservers({ type: 'delete', key, timestamp: Date.now() });
  }

  async clear(): Promise<void> {
    this.storage.clear();
    this.notifyObservers({ type: 'clear', timestamp: Date.now() });
  }

  async keys(): Promise<string[]> {
    return Array.from(this.storage.keys());
  }

  addObserver(observer: StorageObserver): void {
    this.observers.add(observer);
  }

  removeObserver(observer: StorageObserver): void {
    this.observers.delete(observer);
  }

  private notifyObservers(event: StorageEvent): void {
    this.observers.forEach(observer => observer.onStorageEvent(event));
  }
}
