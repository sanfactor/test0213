"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepSeekProvider = void 0;
const base_1 = require("./base");
class DeepSeekProvider extends base_1.BaseLLMProvider {
    constructor(config) {
        super('deepseek', 'DeepSeek', config);
    }
    async initialize(config) {
        this.validateConfig(config);
        this.config = {
            ...this.config,
            ...config,
            modelName: config.modelName || 'deepseek-coder'
        };
        this.initialized = true;
    }
    async generate(prompt, options) {
        if (!this.initialized) {
            throw new Error('Provider not initialized');
        }
        const config = { ...this.config, ...options };
        // Implementation will support both API and local deployment
        if (config.baseUrl) {
            // Local deployment
            throw new Error('Local deployment implementation pending');
        }
        else {
            // API deployment
            throw new Error('API implementation pending');
        }
    }
}
exports.DeepSeekProvider = DeepSeekProvider;
//# sourceMappingURL=deepseek.js.map