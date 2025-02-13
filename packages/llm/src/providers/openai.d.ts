import { LLMConfig, LLMResponse } from '../types';
import { BaseLLMProvider } from './base';
export declare class OpenAIProvider extends BaseLLMProvider {
    constructor(config: LLMConfig);
    initialize(config: LLMConfig): Promise<void>;
    generate(prompt: string, options?: Partial<LLMConfig>): Promise<LLMResponse>;
}
