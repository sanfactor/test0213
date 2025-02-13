"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInitCommand = createInitCommand;
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function createInitCommand() {
    const command = new commander_1.Command('init')
        .description('Initialize a new EvoMind project')
        .action(async () => {
        const answers = await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Project name:',
                default: path_1.default.basename(process.cwd())
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
function createProjectStructure(projectDir, config) {
    const dirs = [
        'src',
        'src/plugins',
        'src/models',
        'src/pipelines',
        'config'
    ];
    dirs.forEach(dir => {
        fs_1.default.mkdirSync(path_1.default.join(projectDir, dir), { recursive: true });
    });
    // Create basic configuration file
    const configFile = {
        name: config.name,
        description: config.description,
        features: config.features,
        version: '0.1.0'
    };
    fs_1.default.writeFileSync(path_1.default.join(projectDir, 'config/project.json'), JSON.stringify(configFile, null, 2));
}
//# sourceMappingURL=init.js.map