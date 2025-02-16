# EvoMind AI Framework

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

</div>

EvoMind is a modular AI framework providing a flexible and extensible platform for AI application development. Through its powerful plugin system and multi-LLM provider support, developers can quickly build and deploy AI applications.

## ✨ Features

- 🤖 **Multi-LLM Support** - Integration with multiple LLM providers including OpenAI, Claude, and DeepSeek, with local deployment support
- 🔌 **Plugin System** - Flexible plugin architecture with hot-reloading and dynamic loading
- 🎯 **Task Orchestration** - Visual workflow designer supporting complex task pipelines
- 💾 **Data Storage** - Support for multiple storage methods, including memory storage and caching
- 🔒 **Security Mechanisms** - Built-in authentication and rate limiting

## 🚀 Quick Start

### Installation

```bash
# Install CLI tool
npm install -g @evomind-ai/cli

# Create new project
evomind init my-project
cd my-project

# Install dependencies
npm install
```

### Configuration

Create `.env` file and configure necessary environment variables:

```env
OPENAI_API_KEY=your_api_key
```

### Running

```bash
# Start development server
npm run dev
```

## 📦 Project Structure

```
evomind-ai/
├── packages/
│   ├── core/          # Core framework
│   ├── llm/           # LLM integration layer
│   ├── plugins/       # Plugin system
│   ├── ui/            # UI components
│   └── cli/           # Command line tools
└── docs/              # Documentation
```

## 🔧 Core Modules

### Core Framework (@evomind-ai/core)

Provides core framework functionality:

```typescript
import { Plugin, ContextChain } from '@evomind-ai/core';

class MyPlugin implements Plugin {
  id = 'my-plugin';
  version = '1.0.0';
  
  async activate(): Promise<void> {
    // Plugin initialization logic
  }
}
```

### LLM Integration (@evomind-ai/llm)

Support for multiple LLM providers:

```typescript
import { LLMProvider } from '@evomind-ai/llm';

const provider = await factory.createProvider('openai', {
  apiKey: 'your-api-key'
});
const response = await provider.generate('Hello');
```

### Plugin System (@evomind-ai/plugins)

Flexible plugin management:

```typescript
import { PluginManager } from '@evomind-ai/plugins';

const manager = new PluginManager();
await manager.loadPlugin(myPlugin, {
  id: 'my-plugin',
  version: '1.0.0'
});
```

## 📚 Development Guide

### Building the Project

```bash
npm run build
```

### Running Tests

```bash
npm run test
```

### Documentation

For detailed documentation, visit the `docs` directory or run:

```bash
cd docs && npm run dev
```

## 🤝 Contributing

Pull Requests and Issues are welcome. Before submitting a PR, please ensure:

1. All tests pass
2. Documentation is updated
3. Code follows the style guide

## 📄 License

This project is licensed under the [MIT](LICENSE) License.
