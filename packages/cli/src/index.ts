#!/usr/bin/env node
import { Command } from 'commander';
import { createInitCommand } from './commands/init.js';
import { createPluginCommand } from './commands/plugin.js';

const program = new Command();

program
  .name('evomind')
  .description('EvoMind AI Framework CLI')
  .version('0.1.0');

program.addCommand(createInitCommand());
program.addCommand(createPluginCommand());

program.parse(process.argv);
