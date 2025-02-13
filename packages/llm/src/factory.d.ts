import { LLMConfig, LLMProvider, LLMProviderFactory } from './types';
export declare class DefaultLLMProviderFactory implements LLMProviderFactory {
    createProvider(type: string, config: LLMConfig): Promise<LLMProvider>;
}
