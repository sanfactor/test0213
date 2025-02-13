"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginManager = void 0;
const events_1 = require("events");
class PluginManager {
    constructor() {
        this.plugins = new Map();
        this.eventEmitter = new events_1.EventEmitter();
        this.eventHandlers = new Map();
    }
    async loadPlugin(plugin, metadata) {
        if (this.plugins.has(plugin.id)) {
            throw new Error(`Plugin ${plugin.id} is already loaded`);
        }
        const extendedPlugin = {
            ...plugin,
            metadata,
            context: {
                emit: async (event) => this.handleEvent(event),
                on: (eventType, handler) => this.registerEventHandler(eventType, handler),
                off: (eventType, handler) => this.unregisterEventHandler(eventType, handler)
            }
        };
        await this.validatePlugin(extendedPlugin);
        await extendedPlugin.activate();
        this.plugins.set(plugin.id, extendedPlugin);
    }
    async unloadPlugin(pluginId) {
        const plugin = this.plugins.get(pluginId);
        if (!plugin) {
            throw new Error(`Plugin ${pluginId} is not loaded`);
        }
        await plugin.deactivate();
        this.plugins.delete(pluginId);
    }
    async reloadPlugin(pluginId) {
        const plugin = this.plugins.get(pluginId);
        if (!plugin) {
            throw new Error(`Plugin ${pluginId} is not loaded`);
        }
        await this.unloadPlugin(pluginId);
        const { metadata, ...originalPlugin } = plugin;
        await this.loadPlugin(originalPlugin, metadata);
    }
    getPlugin(pluginId) {
        return this.plugins.get(pluginId);
    }
    getAllPlugins() {
        return Array.from(this.plugins.values());
    }
    async validatePlugin(plugin) {
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
    async handleEvent(event) {
        const handlers = this.eventHandlers.get(event.type) || new Set();
        const promises = Array.from(handlers).map(handler => handler(event));
        await Promise.all(promises);
    }
    registerEventHandler(eventType, handler) {
        if (!this.eventHandlers.has(eventType)) {
            this.eventHandlers.set(eventType, new Set());
        }
        this.eventHandlers.get(eventType)?.add(handler);
    }
    unregisterEventHandler(eventType, handler) {
        this.eventHandlers.get(eventType)?.delete(handler);
    }
}
exports.PluginManager = PluginManager;
//# sourceMappingURL=manager.js.map