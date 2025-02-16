# Creating Plugins

This guide will help you create your own EvoMind plugin.

## Using CLI to Create a Plugin

```bash
evomind plugin create my-plugin
```

## Plugin Structure

```
my-plugin/
├── manifest.json
├── src/
│   ├── index.ts
│   └── types.ts
├── package.json
└── tsconfig.json
```

## Implementing Plugin Interface

```typescript
import { Plugin } from '@evomind-ai/core';

export class MyPlugin implements Plugin {
  id = 'my-plugin';
  version = '1.0.0';

  async activate(): Promise<void> {
    // Plugin initialization logic
  }

  async deactivate(): Promise<void> {
    // Plugin cleanup logic
  }
}
```

## Plugin Configuration

manifest.json:
```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "My awesome plugin",
  "main": "dist/index.js",
  "author": "Your Name"
}
```

## Publishing Plugin

1. Build the plugin
```bash
npm run build
```

2. Publish to npm
```bash
npm publish
```

## Best Practices

- Write plugins using TypeScript
- Provide complete type definitions
- Implement proper error handling
- Add unit tests
- Write detailed documentation
