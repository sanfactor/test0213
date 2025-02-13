import { LLMConfig, LLMProvider, LLMResponse } from '../types';

export abstract class BaseLLMProvider implements LLMProvider {
  protected config: LLMConfig;
  protected initialized: boolean = false;

  constructor(
    public readonly id: string,
    public readonly name: string,
    config: LLMConfig
  ) {
    this.config = config;
  }

  abstract initialize(config: LLMConfig): Promise<void>;
  abstract generate(prompt: string, options?: Partial<LLMConfig>): Promise<LLMResponse>;

  isInitialized(): boolean {
    return this.initialized;
  }

  protected validateConfig(config: LLMConfig): void {
    if (!config.apiKey && !config.baseUrl) {
      throw new Error('Either apiKey or baseUrl must be provided');
    }
  }
}
