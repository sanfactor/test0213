#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const init_1 = require("./commands/init");
const plugin_1 = require("./commands/plugin");
const program = new commander_1.Command();
program
    .name('evomind')
    .description('EvoMind AI Framework CLI')
    .version('0.1.0');
program.addCommand((0, init_1.createInitCommand)());
program.addCommand((0, plugin_1.createPluginCommand)());
program.parse(process.argv);
//# sourceMappingURL=index.js.map