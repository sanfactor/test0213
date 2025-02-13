import { Plugin } from './types';
import { ExtendedPlugin, PluginMetadata, PluginEvent, PluginEventHandler } from './types';
import { EventEmitter } from 'events';

export class PluginManager {
  private plugins: Map<string, ExtendedPlugin>;
  private eventEmitter: EventEmitter;
  private eventHandlers: Map<string, Set<PluginEventHandler>>;

  constructor() {
    this.plugins = new Map();
    this.eventEmitter = new EventEmitter();
    this.eventHandlers = new Map();
  }

  async loadPlugin(plugin: Plugin, metadata: PluginMetadata): Promise<void> {
    if (this.plugins.has(plugin.id)) {
      throw new Error(`Plugin ${plugin.id} is already loaded`);
    }

    const context = {
      emit: async (event: PluginEvent) => this.handleEvent(event),
      on: (eventType: string, handler: PluginEventHandler) => this.registerEventHandler(eventType, handler),
      off: (eventType: string, handler: PluginEventHandler) => this.unregisterEventHandler(eventType, handler)
    };

    const extendedPlugin: ExtendedPlugin = {
      ...plugin,
      metadata,
      context
    };

    await this.validatePlugin(extendedPlugin);
    await extendedPlugin.activate();
    this.plugins.set(plugin.id, extendedPlugin);
  }

  async unloadPlugin(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin ${pluginId} is not loaded`);
    }

    await plugin.deactivate();
    this.plugins.delete(pluginId);
  }

  async reloadPlugin(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin ${pluginId} is not loaded`);
    }

    await this.unloadPlugin(pluginId);
    const { metadata, ...originalPlugin } = plugin;
    await this.loadPlugin(originalPlugin, metadata);
  }

  getPlugin(pluginId: string): ExtendedPlugin | undefined {
    return this.plugins.get(pluginId);
  }

  getAllPlugins(): ExtendedPlugin[] {
    return Array.from(this.plugins.values());
  }

  private async validatePlugin(plugin: ExtendedPlugin): Promise<void> {
    // Validate plugin dependencies
    if (plugin.metadata.dependencies) {
      for (const [depId, version] of Object.entries(plugin.metadata.dependencies)) {
        const dep = this.plugins.get(depId);
        if (!dep) {
          throw new Error(`Missing dependency: ${depId}`);
        }
        // Here we could add version compatibility checking
      }
    }
  }

  private async handleEvent(event: PluginEvent): Promise<void> {
    const handlers = this.eventHandlers.get(event.type);
    if (handlers && handlers.size > 0) {
      for (const handler of handlers) {
        try {
          await handler(event);
        } catch (error) {
          console.error('Error executing event handler:', error);
        }
      }
    }
  }

  private registerEventHandler(eventType: string, handler: PluginEventHandler): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, new Set());
    }
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      handlers.add(handler);
    }
  }

  private unregisterEventHandler(eventType: string, handler: PluginEventHandler): void {
    this.eventHandlers.get(eventType)?.delete(handler);
  }
}
