export interface StorageProvider {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
}

export interface StorageOptions {
  namespace?: string;
  ttl?: number;
  encryption?: {
    enabled: boolean;
    key?: string;
  };
}

export interface SyncOptions {
  strategy: 'lastWriteWins' | 'merge';
  conflictResolution?: (local: any, remote: any) => any;
}

export interface StorageEvent {
  type: 'set' | 'delete' | 'clear';
  key?: string;
  value?: any;
  timestamp: number;
}

export interface StorageObserver {
  onStorageEvent(event: StorageEvent): void;
}
