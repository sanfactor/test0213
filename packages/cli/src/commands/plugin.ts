import { Command } from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';

export function createPluginCommand(): Command {
  const command = new Command('plugin')
    .description('Manage EvoMind plugins');

  command
    .command('create')
    .description('Create a new plugin')
    .action(async () => {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Plugin name:'
        },
        {
          type: 'input',
          name: 'description',
          message: 'Plugin description:'
        },
        {
          type: 'list',
          name: 'type',
          message: 'Plugin type:',
          choices: ['trigger', 'action', 'processor']
        }
      ]);

      createPluginStructure(process.cwd(), answers);
      console.log('Plugin created successfully!');
    });

  return command;
}

function createPluginStructure(baseDir: string, config: any): void {
  const pluginDir = path.join(baseDir, 'src/plugins', config.name);
  fs.mkdirSync(pluginDir, { recursive: true });

  // Create plugin manifest
  const manifest = {
    name: config.name,
    description: config.description,
    type: config.type,
    version: '0.1.0',
    main: 'index.ts'
  };

  fs.writeFileSync(
    path.join(pluginDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  // Create plugin entry point
  const pluginTemplate = `
import { Plugin } from '@evomind-ai/core';

export class ${toPascalCase(config.name)}Plugin implements Plugin {
  id = '${config.name}';
  version = '0.1.0';

  async activate(): Promise<void> {
    // Plugin activation logic
  }

  async deactivate(): Promise<void> {
    // Plugin cleanup logic
  }
}
`;

  fs.writeFileSync(
    path.join(pluginDir, 'index.ts'),
    pluginTemplate.trim()
  );
}

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}
