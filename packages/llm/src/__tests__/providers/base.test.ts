import { BaseLLMProvider } from '../../providers/base';
import { LLMConfig, LLMResponse } from '../../types';

class TestProvider extends BaseLLMProvider {
  async initialize(config: LLMConfig): Promise<void> {
    this.validateConfig(config);
    this.config = config;
    this.initialized = true;
  }

  async generate(prompt: string, options?: Partial<LLMConfig>): Promise<LLMResponse> {
    if (!this.initialized) {
      throw new Error('Provider not initialized');
    }
    return {
      text: 'test response',
      modelName: 'test-model',
      usage: {
        promptTokens: 10,
        completionTokens: 20,
        totalTokens: 30
      }
    };
  }
}

describe('BaseLLMProvider', () => {
  let provider: TestProvider;

  beforeEach(() => {
    provider = new TestProvider('test', 'Test Provider', { apiKey: 'test-key' });
  });

  test('should initialize with valid config', async () => {
    await provider.initialize({ apiKey: 'test-key' });
    expect(provider.isInitialized()).toBe(true);
  });

  test('should throw error when initializing with invalid config', async () => {
    await expect(provider.initialize({})).rejects.toThrow();
  });

  test('should generate response when initialized', async () => {
    await provider.initialize({ apiKey: 'test-key' });
    const response = await provider.generate('test prompt');
    expect(response.text).toBeDefined();
    expect(response.modelName).toBeDefined();
  });

  test('should throw error when generating without initialization', async () => {
    await expect(provider.generate('test prompt')).rejects.toThrow();
  });
});
