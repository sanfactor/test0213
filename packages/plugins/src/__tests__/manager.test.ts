import { PluginManager } from '../manager';
import { Plugin, ExtendedPlugin, PluginMetadata } from '../types';

describe('PluginManager', () => {
  let pluginManager: PluginManager;

  beforeEach(() => {
    pluginManager = new PluginManager();
  });

  const createMockPlugin = (id: string): ExtendedPlugin => ({
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
    const eventHandler = jest.fn();
    const eventType = 'test-event';
    
    // Load plugin first
    await pluginManager.loadPlugin(plugin, plugin.metadata);
    const loadedPlugin = pluginManager.getPlugin('test-plugin');
    expect(loadedPlugin).toBeDefined();
    expect(loadedPlugin?.context).toBeDefined();

    // Register event handler
    loadedPlugin?.context?.on(eventType, eventHandler);

    // Create and emit event
    const testEvent = {
      type: eventType,
      payload: { test: true },
      source: 'test-plugin',
      timestamp: new Date()
    };
    
    await loadedPlugin?.context?.emit(testEvent);

    // Wait for event processing
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verify handler was called
    expect(eventHandler).toHaveBeenCalled();
    const calls = eventHandler.mock.calls;
    expect(calls[0][0]).toMatchObject({
      type: eventType,
      payload: { test: true },
      source: 'test-plugin'
    });
  });
});
