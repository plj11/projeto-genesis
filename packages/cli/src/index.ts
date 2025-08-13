#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { writeAndVerifyFile } from './utils.js';
import pkg from '../package.json' with { type: 'json' };

// Helper para obter o caminho do diretório em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('genesis')
  .version(pkg.version)
  .description('Gênesis CLI - Sua plataforma de engenharia de software automatizada.');

// --- FUNÇÕES AUXILIARES PARA GERAÇÃO DE CÓDIGO ---

// Função para adicionar modelo ao schema.prisma
async function addModelLogic(modelName: string, options: { fields?: string }, projectRoot: string) {
  console.log(chalk.cyan.bold('\n🤖 Copiloto Gênesis: Adicionar Modelo'));
  console.log(`   - Nome do Modelo: ${chalk.green(modelName)}`);

  const schemaPath = path.join(projectRoot, 'schema.prisma');

  if (!fs.existsSync(schemaPath)) {
    console.error(chalk.red(`\nErro: schema.prisma não encontrado em ${schemaPath}. Certifique-se de estar no diretório raiz do seu projeto.`));
    process.exit(1);
  }

  try {
    let schemaContent = fs.readFileSync(schemaPath, 'utf-8');

    let modelFields = '';
    if (options.fields) {
      const fields = options.fields.split(',').map(field => {
        const [name, type] = field.split(':');
        return `  ${name.trim()} ${type.trim()}`;
      });
      modelFields = fields.join('\n');
    } else {
      console.log(chalk.yellow('   - Nenhum campo especificado. Adicionando campos padrão (id, createdAt, updatedAt).'));
      modelFields = `  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt`;
    }

    const newModel = `\nmodel ${modelName} {\n${modelFields}\n}\n`;

    schemaContent += newModel;

    if (!writeAndVerifyFile(schemaPath, schemaContent)) {
      console.error(chalk.red(`\nFalha ao adicionar o modelo ${modelName} ao schema.prisma.`));
      process.exit(1);
    }

    console.log(chalk.green.bold(`\n✅ Modelo ${modelName} adicionado com sucesso ao schema.prisma!`));
    console.log(chalk.cyan.bold('\nPróximos passos:'));
    console.log(`   1. Execute ${chalk.yellow('npx prisma migrate dev')} para aplicar as mudanças no banco de dados.`);

  } catch (error: any) {
    console.error(chalk.red('\nOcorreu um erro ao adicionar o modelo:'), error.message, error);
    process.exit(1);
  }
}

// Função para gerar rotas de API
async function addApiLogic(modelName: string, projectRoot: string) {
  console.log(chalk.cyan.bold('\n🤖 Copiloto Gênesis: Gerar API'));
  console.log(`   - Modelo: ${chalk.green(modelName)}`);

  const apiPath = path.join(projectRoot, 'app', 'api', `${modelName.toLowerCase()}s`);
  const apiIdPath = path.join(apiPath, '[id]');

  const capitalizedModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
  const pluralModelName = modelName.toLowerCase() + 's'; // Simple pluralization

  const templatePath = path.join(__dirname, '..', 'src', 'templates', 'api');

  try {
    // Criação das pastas
    console.log(`\n1. Criando diretório de API em ${chalk.cyan(apiPath)}`);
    fs.mkdirSync(apiPath, { recursive: true });
    fs.mkdirSync(apiIdPath, { recursive: true });

    // Leitura e processamento dos templates
    let listCreateContent = fs.readFileSync(path.join(templatePath, 'route-list-create.ts.tpl'), 'utf-8');
    let detailContent = fs.readFileSync(path.join(templatePath, 'route-detail.ts.tpl'), 'utf-8');

    // Substituição dos placeholders
    listCreateContent = listCreateContent
      .replace(/{{modelNameLower}}/g, modelName.toLowerCase())
      .replace(/{{pluralModelName}}/g, pluralModelName)
      .replace(/{{capitalizedModelName}}/g, capitalizedModelName);

    detailContent = detailContent
      .replace(/{{modelNameLower}}/g, modelName.toLowerCase())
      .replace(/{{pluralModelName}}/g, pluralModelName)
      .replace(/{{capitalizedModelName}}/g, capitalizedModelName);

    // Criação dos arquivos de rota
    if (!writeAndVerifyFile(path.join(apiPath, 'route.ts'), listCreateContent)) {
      console.error(chalk.red(`\nFalha ao gerar ${pluralModelName}/route.ts.`));
      process.exit(1);
    }

    if (!writeAndVerifyFile(path.join(apiIdPath, 'route.ts'), detailContent)) {
      console.error(chalk.red(`\nFalha ao gerar ${pluralModelName}/[id]/route.ts.`));
      process.exit(1);
    }

    console.log(chalk.green.bold(`\n✅ Rotas de API para o modelo ${modelName} geradas com sucesso!`));
    console.log(chalk.cyan.bold('\nPróximos passos:'));
    console.log(`   1. Verifique os arquivos gerados em ${chalk.yellow(`app/api/${pluralModelName}`)}`);
    console.log(`   2. Descomente as linhas de autenticação se necessário.`);
    console.log(`   3. Execute ${chalk.yellow('npm run dev')} para testar suas novas APIs.`);

  } catch (error: any) {
    console.error(chalk.red('\nOcorreu um erro ao gerar as APIs:'), error.message, error);
    process.exit(1);
  }
}

// Função para gerar páginas de UI
async function addPageLogic(modelName: string, projectRoot: string) {
  console.log(chalk.cyan.bold('\n🤖 Copiloto Gênesis: Gerar Páginas'));
  console.log(`   - Modelo: ${chalk.green(modelName)}`);

  const pagePath = path.join(projectRoot, 'app', `${modelName.toLowerCase()}s`);
  const detailPagePath = path.join(pagePath, '[id]');

  const capitalizedModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
  const pluralModelName = modelName.toLowerCase() + 's'; // Simple pluralization

  const templatePath = path.join(__dirname, '..', 'src', 'templates', 'pages');

  try {
    // Criação das pastas
    console.log(`\n1. Criando diretório de páginas em ${chalk.cyan(pagePath)}`);
    fs.mkdirSync(pagePath, { recursive: true });
    fs.mkdirSync(detailPagePath, { recursive: true });

    // Leitura e processamento dos templates
    let listPageContent = fs.readFileSync(path.join(templatePath, 'list-page.tsx.tpl'), 'utf-8');
    let detailPageContent = fs.readFileSync(path.join(templatePath, 'detail-page.tsx.tpl'), 'utf-8');

    // Substituição dos placeholders
    listPageContent = listPageContent
      .replace(/{{modelNameLower}}/g, modelName.toLowerCase())
      .replace(/{{pluralModelName}}/g, pluralModelName)
      .replace(/{{capitalizedModelName}}/g, capitalizedModelName);

    detailPageContent = detailPageContent
      .replace(/{{modelNameLower}}/g, modelName.toLowerCase())
      .replace(/{{pluralModelName}}/g, pluralModelName)
      .replace(/{{capitalizedModelName}}/g, capitalizedModelName);

    // Criação dos arquivos de página
    if (!writeAndVerifyFile(path.join(pagePath, 'page.tsx'), listPageContent)) {
      console.error(chalk.red(`\nFalha ao gerar ${pluralModelName}/page.tsx.`));
      process.exit(1);
    }

    if (!writeAndVerifyFile(path.join(detailPagePath, 'page.tsx'), detailPageContent)) {
      console.error(chalk.red(`\nFalha ao gerar ${pluralModelName}/[id]/page.tsx.`));
      process.exit(1);
    }

    console.log(chalk.green.bold(`\n✅ Páginas para o modelo ${modelName} geradas com sucesso!`));
    console.log(chalk.cyan.bold('\nPróximos passos:'));
    console.log(`   1. Verifique os arquivos gerados em ${chalk.yellow(`app/${pluralModelName}`)}`);
    console.log(`   2. Execute ${chalk.yellow('npm run dev')} para testar suas novas páginas.`);

  } catch (error: any) {
    console.error(chalk.red('\nOcorreu um erro ao gerar as páginas:'), error.message, error);
    process.exit(1);
  }
}

// --- COMANDOS DA CLI ---
program
  .command('new <project-name>')
  .alias('n')
  .description('Cria um novo projeto a partir de um arquétipo Gênesis.')
  .action((projectName: string) => {
    console.log(chalk.green.bold(`\n🚀 Iniciando a criação do projeto: ${projectName}...`));

    const projectPath = path.join(process.cwd(), projectName);
    const archetypePath = path.join(__dirname, '..', 'src', 'archetypes', 'saas-b2b');

    if (fs.existsSync(projectPath)) {
      console.error(chalk.red(`\nErro: O diretório ${projectName} já existe.`));
      process.exit(1);
    }

    try {
      console.log(`\n1. Criando diretório em ${chalk.cyan(projectPath)}`);
      fs.mkdirSync(projectPath, { recursive: true });

      console.log(`2. Copiando arquivos do arquétipo...`);
      fs.cpSync(archetypePath, projectPath, { recursive: true });

      console.log(chalk.green.bold(`\n✅ Projeto ${projectName} criado com sucesso!`));
      console.log(chalk.cyan.bold('\nPróximos passos:'));
      console.log(`   1. Acesse o diretório do projeto: ${chalk.yellow(`cd ${projectName}`)}`);
      console.log(`   2. Instale as dependências: ${chalk.yellow('npm install')}`);
      console.log(`   3. Configure suas variáveis de ambiente no arquivo ${chalk.yellow('.env')}`);
      console.log(`   4. Execute o projeto: ${chalk.yellow('npm run dev')}`);

    } catch (error) {
      console.error(chalk.red('\nOcorreu um erro durante a criação do projeto:'), error);
      process.exit(1);
    }
  });

program
  .command('add:model <modelName>')
  .description('Adiciona um novo modelo de dados ao schema.prisma.')
  .option('-f, --fields <fields>', 'Campos do modelo no formato "nome:tipo, nome2:tipo2"')
  .action(async (modelName: string, options: { fields?: string }) => {
    await addModelLogic(modelName, options, process.cwd());
  });

program
  .command('add:api <modelName>')
  .description('Gera rotas de API (CRUD) para um modelo específico.')
  .action(async (modelName: string) => {
    await addApiLogic(modelName, process.cwd());
  });

program
  .command('add:page <modelName>')
  .description('Gera páginas de UI (listagem e detalhe) para um modelo específico.')
  .action(async (modelName: string) => {
    await addPageLogic(modelName, process.cwd());
  });

program
  .command('add:feature <featureName>')
  .description('Gera uma funcionalidade completa (modelo, API e páginas de UI) para um novo recurso.')
  .option('-f, --fields <fields>', 'Campos do modelo no formato "nome:tipo, nome2:tipo2"')
  .action(async (featureName: string, options: { fields?: string }) => {
    console.log(chalk.cyan.bold(`\n🤖 Copiloto Gênesis: Gerar Funcionalidade Completa: ${featureName}`));
    const projectRoot = process.cwd();

    try {
      // 1. Adicionar Modelo
      console.log(chalk.blue(`\n--- Adicionando Modelo ${featureName} ---`));
      await addModelLogic(featureName, options, projectRoot);

      // 2. Gerar APIs
      console.log(chalk.blue(`\n--- Gerando APIs para ${featureName} ---`));
      await addApiLogic(featureName, projectRoot);

      // 3. Gerar Páginas
      console.log(chalk.blue(`\n--- Gerando Páginas para ${featureName} ---`));
      await addPageLogic(featureName, projectRoot);

      console.log(chalk.green.bold(`\n✅ Funcionalidade ${featureName} gerada com sucesso!`));
      console.log(chalk.cyan.bold('\nPróximos passos:'));
      console.log(`   1. Execute ${chalk.yellow('npx prisma migrate dev')} para aplicar as mudanças no banco de dados.`);
      console.log(`   2. Verifique os arquivos gerados em ${chalk.yellow(`app/api/${featureName.toLowerCase()}s`)} e ${chalk.yellow(`app/${featureName.toLowerCase()}s`)}.`);
      console.log(`   3. Execute ${chalk.yellow('npm run dev')} para testar sua nova funcionalidade.`);

    } catch (error: any) {
      console.error(chalk.red('\nOcorreu um erro ao gerar a funcionalidade:'), error.message, error);
      process.exit(1);
    }
  });

program.parse(process.argv);
