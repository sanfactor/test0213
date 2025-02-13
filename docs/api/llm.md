# LLM API参考

## LLMProvider 接口

```typescript
interface LLMProvider {
  id: string;
  name: string;
  initialize(config: LLMConfig): Promise<void>;
  generate(prompt: string, options?: LLMConfig): Promise<LLMResponse>;
  isInitialized(): boolean;
}
```

## LLMConfig 接口

```typescript
interface LLMConfig {
  apiKey?: string;
  baseUrl?: string;
  modelName?: string;
  maxTokens?: number;
  temperature?: number;
}
```

## 使用示例

```typescript
import { LLMProvider, LLMConfig } from '@evomind-ai/llm';

// 配置OpenAI提供商
const config: LLMConfig = {
  apiKey: 'your-api-key',
  modelName: 'gpt-3.5-turbo'
};

// 使用LLM
async function generateText() {
  const provider = await factory.createProvider('openai', config);
  const response = await provider.generate('Hello, world!');
  console.log(response.text);
}
```

## 支持的提供商

- OpenAI
- Claude (Anthropic)
- DeepSeek (支持本地部署)
