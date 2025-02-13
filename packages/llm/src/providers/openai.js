"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIProvider = void 0;
const base_1 = require("./base");
class OpenAIProvider extends base_1.BaseLLMProvider {
    constructor(config) {
        super('openai', 'OpenAI', config);
    }
    async initialize(config) {
        this.validateConfig(config);
        this.config = {
            ...this.config,
            ...config,
            modelName: config.modelName || 'gpt-3.5-turbo'
        };
        this.initialized = true;
    }
    async generate(prompt, options) {
        if (!this.initialized) {
            throw new Error('Provider not initialized');
        }
        const config = { ...this.config, ...options };
        // Implementation will use OpenAI API
        throw new Error('Implementation pending');
    }
}
exports.OpenAIProvider = OpenAIProvider;
//# sourceMappingURL=openai.js.map