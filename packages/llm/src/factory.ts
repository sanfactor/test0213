import { LLMConfig, LLMProvider, LLMProviderFactory } from './types';
import { OpenAIProvider } from './providers/openai';
import { ClaudeProvider } from './providers/anthropic';
import { DeepSeekProvider } from './providers/deepseek';

export class DefaultLLMProviderFactory implements LLMProviderFactory {
  async createProvider(type: string, config: LLMConfig): Promise<LLMProvider> {
    let provider: LLMProvider;

    switch (type.toLowerCase()) {
      case 'openai':
        provider = new OpenAIProvider(config);
        break;
      case 'claude':
        provider = new ClaudeProvider(config);
        break;
      case 'deepseek':
        provider = new DeepSeekProvider(config);
        break;
      default:
        throw new Error(`Unsupported LLM provider type: ${type}`);
    }

    await provider.initialize(config);
    return provider;
  }
}
