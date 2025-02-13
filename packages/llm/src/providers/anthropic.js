"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaudeProvider = void 0;
const base_1 = require("./base");
class ClaudeProvider extends base_1.BaseLLMProvider {
    constructor(config) {
        super('claude', 'Anthropic Claude', config);
    }
    async initialize(config) {
        this.validateConfig(config);
        this.config = {
            ...this.config,
            ...config,
            modelName: config.modelName || 'claude-2'
        };
        this.initialized = true;
    }
    async generate(prompt, options) {
        if (!this.initialized) {
            throw new Error('Provider not initialized');
        }
        const config = { ...this.config, ...options };
        // Implementation will use Anthropic API
        throw new Error('Implementation pending');
    }
}
exports.ClaudeProvider = ClaudeProvider;
//# sourceMappingURL=anthropic.js.map