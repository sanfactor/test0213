export interface LLMConfig {
  apiKey?: string;
  baseUrl?: string;
  modelName?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface LLMResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  modelName: string;
}

export interface LLMProvider {
  id: string;
  name: string;
  initialize(config: LLMConfig): Promise<void>;
  generate(prompt: string, options?: Partial<LLMConfig>): Promise<LLMResponse>;
  isInitialized(): boolean;
}

export interface LLMProviderFactory {
  createProvider(type: string, config: LLMConfig): Promise<LLMProvider>;
}
