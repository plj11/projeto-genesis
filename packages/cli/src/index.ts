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

// --- COMANDOS DE GERAÇÃO ---
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

// --- COMANDOS DO COPILOTO ---
program
  .command('add:model <modelName>')
  .description('Adiciona um novo modelo de dados ao schema.prisma.')
  .option('-f, --fields <fields>', 'Campos do modelo no formato "nome:tipo, nome2:tipo2"')
  .action((modelName: string, options: { fields?: string }) => {
    console.log(chalk.cyan.bold('\n🤖 Copiloto Gênesis: Adicionar Modelo'));
    console.log(`   - Nome do Modelo: ${chalk.green(modelName)}`);

    const schemaPath = path.join(process.cwd(), 'schema.prisma');

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

      fs.writeFileSync(schemaPath, schemaContent);

      console.log(chalk.green.bold(`\n✅ Modelo ${modelName} adicionado com sucesso ao schema.prisma!`));
      console.log(chalk.cyan.bold('\nPróximos passos:'));
      console.log(`   1. Execute ${chalk.yellow('npx prisma migrate dev')} para aplicar as mudanças no banco de dados.`);

    } catch (error) {
      console.error(chalk.red('\nOcorreu um erro ao adicionar o modelo:'), error);
      process.exit(1);
    }
  });

program
  .command('add:api <modelName>')
  .description('Gera rotas de API (CRUD) para um modelo específico.')
  .action((modelName: string) => {
    console.log(chalk.cyan.bold('\n🤖 Copiloto Gênesis: Gerar API'));
    console.log(`   - Modelo: ${chalk.green(modelName)}`);

    const projectRoot = process.cwd();
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
      console.log(`2. Gerando ${chalk.yellow(`app/api/${pluralModelName}/route.ts`)}`);
      fs.writeFileSync(path.join(apiPath, 'route.ts'), listCreateContent);

      console.log(`3. Gerando ${chalk.yellow(`app/api/${pluralModelName}/[id]/route.ts`)}`);
      fs.writeFileSync(path.join(apiIdPath, 'route.ts'), detailContent);

      console.log(chalk.green.bold(`\n✅ Rotas de API para o modelo ${modelName} geradas com sucesso!`));
      console.log(chalk.cyan.bold('\nPróximos passos:'));
      console.log(`   1. Verifique os arquivos gerados em ${chalk.yellow(`app/api/${pluralModelName}`)}`);
      console.log(`   2. Descomente as linhas de autenticação se necessário.`);
      console.log(`   3. Execute ${chalk.yellow('npm run dev')} para testar suas novas APIs.`);

    } catch (error) {
      console.error(chalk.red('\nOcorreu um erro ao gerar as APIs:'), error);
      process.exit(1);
    }
  });

program.parse(process.argv);