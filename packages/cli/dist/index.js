#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import pkg from '../package.json' with { type: 'json' };
const program = new Command();
program
    .name('genesis')
    .version(pkg.version)
    .description('Gênesis CLI - Sua plataforma de engenharia de software automatizada.');
// Comando NEW
program
    .command('new <project-name>')
    .alias('n')
    .description('Cria um novo projeto a partir de um arquétipo Gênesis.')
    .action((projectName) => {
    console.log(chalk.green.bold(`\n🚀 Iniciando a criação do projeto: ${projectName}...\n`));
    // Futuramente, aqui chamaremos a lógica de geração de código.
});
program.parse(process.argv);
