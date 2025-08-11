#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import pkg from '../package.json' with { type: 'json' };
// Helper para obter o caminho do diretório em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
    console.log(chalk.green.bold(`\n🚀 Iniciando a criação do projeto: ${projectName}...`));
    const projectPath = path.join(process.cwd(), projectName);
    // Caminho corrigido para apontar para a pasta SRC
    const archetypePath = path.join(__dirname, '..', 'src', 'archetypes', 'saas-b2b');
    // Verifica se o diretório já existe
    if (fs.existsSync(projectPath)) {
        console.error(chalk.red(`\nErro: O diretório ${projectName} já existe.`));
        process.exit(1);
    }
    try {
        // 1. Cria o diretório do projeto
        console.log(`\n1. Criando diretório em ${chalk.cyan(projectPath)}`);
        fs.mkdirSync(projectPath, { recursive: true });
        // 2. Copia os arquivos do arquétipo
        console.log(`2. Copiando arquivos do arquétipo...`);
        fs.cpSync(archetypePath, projectPath, { recursive: true });
        console.log(chalk.green.bold(`\n✅ Projeto ${projectName} criado com sucesso!`));
        console.log(chalk.cyan.bold('\nPróximos passos:'));
        console.log(`   1. Acesse o diretório do projeto: ${chalk.yellow(`cd ${projectName}`)}`);
        console.log(`   2. Instale as dependências: ${chalk.yellow('npm install')}`);
        console.log(`   3. Configure suas variáveis de ambiente no arquivo ${chalk.yellow('.env')}`);
        console.log(`   4. Execute o projeto: ${chalk.yellow('npm run dev')}`);
    }
    catch (error) {
        console.error(chalk.red('\nOcorreu um erro durante a criação do projeto:'), error);
        process.exit(1);
    }
});
program.parse(process.argv);
