import { Plugin } from './types';
import { ExtendedPlugin, PluginMetadata } from './types';
export declare class PluginManager {
    private plugins;
    private eventEmitter;
    private eventHandlers;
    constructor();
    loadPlugin(plugin: Plugin, metadata: PluginMetadata): Promise<void>;
    unloadPlugin(pluginId: string): Promise<void>;
    reloadPlugin(pluginId: string): Promise<void>;
    getPlugin(pluginId: string): ExtendedPlugin | undefined;
    getAllPlugins(): ExtendedPlugin[];
    private validatePlugin;
    private handleEvent;
    private registerEventHandler;
    private unregisterEventHandler;
}
