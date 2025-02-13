export interface Plugin {
    id: string;
    version: string;
    activate(): Promise<void>;
    deactivate(): Promise<void>;
}
export interface PluginMetadata {
    id: string;
    version: string;
    name: string;
    description?: string;
    author?: string;
    dependencies?: Record<string, string>;
}
export interface PluginEvent {
    type: string;
    payload: any;
    source: string;
    timestamp: Date;
}
export interface PluginEventHandler {
    (event: PluginEvent): Promise<void>;
}
export interface PluginContext {
    emit(event: PluginEvent): Promise<void>;
    on(eventType: string, handler: PluginEventHandler): void;
    off(eventType: string, handler: PluginEventHandler): void;
}
export interface ExtendedPlugin extends Plugin {
    metadata: PluginMetadata;
    context?: PluginContext;
}
