import { LLMConfig, LLMProvider, LLMResponse } from '../types';
export declare abstract class BaseLLMProvider implements LLMProvider {
    readonly id: string;
    readonly name: string;
    protected config: LLMConfig;
    protected initialized: boolean;
    constructor(id: string, name: string, config: LLMConfig);
    abstract initialize(config: LLMConfig): Promise<void>;
    abstract generate(prompt: string, options?: Partial<LLMConfig>): Promise<LLMResponse>;
    isInitialized(): boolean;
    protected validateConfig(config: LLMConfig): void;
}
