"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLLMProvider = void 0;
class BaseLLMProvider {
    constructor(id, name, config) {
        this.id = id;
        this.name = name;
        this.initialized = false;
        this.config = config;
    }
    isInitialized() {
        return this.initialized;
    }
    validateConfig(config) {
        if (!config.apiKey && !config.baseUrl) {
            throw new Error('Either apiKey or baseUrl must be provided');
        }
    }
}
exports.BaseLLMProvider = BaseLLMProvider;
//# sourceMappingURL=base.js.map