"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPluginCommand = createPluginCommand;
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function createPluginCommand() {
    const command = new commander_1.Command('plugin')
        .description('Manage EvoMind plugins');
    command
        .command('create')
        .description('Create a new plugin')
        .action(async () => {
        const answers = await inquirer_1.default.prompt([
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
function createPluginStructure(baseDir, config) {
    const pluginDir = path_1.default.join(baseDir, 'src/plugins', config.name);
    fs_1.default.mkdirSync(pluginDir, { recursive: true });
    // Create plugin manifest
    const manifest = {
        name: config.name,
        description: config.description,
        type: config.type,
        version: '0.1.0',
        main: 'index.ts'
    };
    fs_1.default.writeFileSync(path_1.default.join(pluginDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
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
    fs_1.default.writeFileSync(path_1.default.join(pluginDir, 'index.ts'), pluginTemplate.trim());
}
function toPascalCase(str) {
    return str
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
}
//# sourceMappingURL=plugin.js.map