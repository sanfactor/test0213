"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("../factory");
describe('DefaultLLMProviderFactory', () => {
    let factory;
    const testConfig = { apiKey: 'test-key' };
    beforeEach(() => {
        factory = new factory_1.DefaultLLMProviderFactory();
    });
    test('should create OpenAI provider', async () => {
        const provider = await factory.createProvider('openai', testConfig);
        expect(provider.id).toBe('openai');
        expect(provider.isInitialized()).toBe(true);
    });
    test('should create Claude provider', async () => {
        const provider = await factory.createProvider('claude', testConfig);
        expect(provider.id).toBe('claude');
        expect(provider.isInitialized()).toBe(true);
    });
    test('should create DeepSeek provider', async () => {
        const provider = await factory.createProvider('deepseek', testConfig);
        expect(provider.id).toBe('deepseek');
        expect(provider.isInitialized()).toBe(true);
    });
    test('should throw error for unsupported provider', async () => {
        await expect(factory.createProvider('unsupported', testConfig)).rejects.toThrow();
    });
});
//# sourceMappingURL=factory.test.js.map