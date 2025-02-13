"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLLMProviderFactory = void 0;
const openai_1 = require("./providers/openai");
const anthropic_1 = require("./providers/anthropic");
const deepseek_1 = require("./providers/deepseek");
class DefaultLLMProviderFactory {
    async createProvider(type, config) {
        let provider;
        switch (type.toLowerCase()) {
            case 'openai':
                provider = new openai_1.OpenAIProvider(config);
                break;
            case 'claude':
                provider = new anthropic_1.ClaudeProvider(config);
                break;
            case 'deepseek':
                provider = new deepseek_1.DeepSeekProvider(config);
                break;
            default:
                throw new Error(`Unsupported LLM provider type: ${type}`);
        }
        await provider.initialize(config);
        return provider;
    }
}
exports.DefaultLLMProviderFactory = DefaultLLMProviderFactory;
//# sourceMappingURL=factory.js.map