#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import pkg from '../package.json' with { type: 'json' };
const program = new Command();
program
    .name('genesis')
    .version(pkg.version)
    .description('Gênesis CLI - Sua plataforma de engenharia de software automatizada.')
    .action(() => {
    console.log(chalk.cyan.bold('Bem-vindo ao Gênesis CLI!'));
    console.log('Execute `genesis --help` para ver os comandos disponíveis.');
});
program.parse(process.argv);
