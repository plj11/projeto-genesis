import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname, { recursive: true });
  return true;
}

export function writeAndVerifyFile(filePath: string, content: string): boolean {
  try {
    console.log(chalk.blue(`DEBUG: Tentando escrever arquivo: ${filePath}`));
    ensureDirectoryExistence(filePath);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(chalk.blue(`DEBUG: Arquivo escrito: ${filePath}`));

    const writtenContent = fs.readFileSync(filePath, 'utf-8');
    if (writtenContent === content) {
      console.log(chalk.green(`DEBUG: Verificação: Conteúdo do arquivo ${filePath} corresponde ao esperado.`));
      return true;
    } else {
      console.error(chalk.red(`DEBUG: Verificação: Conteúdo do arquivo ${filePath} NÃO corresponde ao esperado.`));
      return false;
    }
  } catch (error: any) {
    console.error(chalk.red(`DEBUG: Erro ao escrever/verificar arquivo ${filePath}:`), error.message, error);
    return false;
  }
}
