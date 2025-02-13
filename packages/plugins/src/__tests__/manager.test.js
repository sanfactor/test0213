"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../manager");
describe('PluginManager', () => {
    let pluginManager;
    beforeEach(() => {
        pluginManager = new manager_1.PluginManager();
    });
    const createMockPlugin = (id) => ({
        id,
        version: '1.0.0',
        metadata: {
            id,
            version: '1.0.0',
            name: `Test Plugin ${id}`,
            description: 'Test plugin for unit tests'
        },
        activate: jest.fn().mockResolvedValue(undefined),
        deactivate: jest.fn().mockResolvedValue(undefined)
    });
    test('should load plugin successfully', async () => {
        const plugin = createMockPlugin('test-plugin');
        await pluginManager.loadPlugin(plugin, plugin.metadata);
        expect(plugin.activate).toHaveBeenCalled();
        expect(pluginManager.getPlugin('test-plugin')).toBeDefined();
    });
    test('should unload plugin successfully', async () => {
        const plugin = createMockPlugin('test-plugin');
        await pluginManager.loadPlugin(plugin, plugin.metadata);
        await pluginManager.unloadPlugin('test-plugin');
        expect(plugin.deactivate).toHaveBeenCalled();
        expect(pluginManager.getPlugin('test-plugin')).toBeUndefined();
    });
    test('should reload plugin successfully', async () => {
        const plugin = createMockPlugin('test-plugin');
        await pluginManager.loadPlugin(plugin, plugin.metadata);
        await pluginManager.reloadPlugin('test-plugin');
        expect(plugin.deactivate).toHaveBeenCalled();
        expect(plugin.activate).toHaveBeenCalledTimes(2);
    });
    test('should handle plugin events', async () => {
        const plugin = createMockPlugin('test-plugin');
        await pluginManager.loadPlugin(plugin, plugin.metadata);
        const eventHandler = jest.fn();
        plugin.context?.on('test-event', eventHandler);
        await plugin.context?.emit({
            type: 'test-event',
            payload: { test: true },
            source: 'test-plugin',
            timestamp: new Date()
        });
        expect(eventHandler).toHaveBeenCalled();
    });
});
//# sourceMappingURL=manager.test.js.map