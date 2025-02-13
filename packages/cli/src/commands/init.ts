import { Command } from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';

export function createInitCommand(): Command {
  const command = new Command('init')
    .description('Initialize a new EvoMind project')
    .action(async () => {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Project name:',
          default: path.basename(process.cwd())
        },
        {
          type: 'input',
          name: 'description',
          message: 'Project description:'
        },
        {
          type: 'checkbox',
          name: 'features',
          message: 'Select features to enable:',
          choices: [
            { name: 'OpenAI Integration', value: 'openai', checked: true },
            { name: 'Claude Integration', value: 'claude' },
            { name: 'DeepSeek Integration', value: 'deepseek' },
            { name: 'Local Model Support', value: 'local' }
          ]
        }
      ]);

      // Create project structure
      const projectDir = process.cwd();
      createProjectStructure(projectDir, answers);
      console.log('Project initialized successfully!');
    });

  return command;
}

function createProjectStructure(projectDir: string, config: any): void {
  const dirs = [
    'src',
    'src/plugins',
    'src/models',
    'src/pipelines',
    'config'
  ];

  dirs.forEach(dir => {
    fs.mkdirSync(path.join(projectDir, dir), { recursive: true });
  });

  // Create basic configuration file
  const configFile = {
    name: config.name,
    description: config.description,
    features: config.features,
    version: '0.1.0'
  };

  fs.writeFileSync(
    path.join(projectDir, 'config/project.json'),
    JSON.stringify(configFile, null, 2)
  );
}
