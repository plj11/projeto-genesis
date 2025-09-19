# Relatório da Stack Tecnológica - `packages/website`

Este documento detalha as tecnologias, bibliotecas e frameworks identificados no workspace `packages/website` do projeto `projeto-genesis-novo`.

## Core Framework & Linguagem

- **Framework Principal:** [Next.js](https://nextjs.org/) (v14.2.32)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (v5)
- **Biblioteca de UI:** [React](https://react.dev/) (v18.3.1)

## Estilização e UI

- **CSS Framework:** [Tailwind CSS](https://tailwindcss.com/) (v3.4.17)
- **CSS Pre/Post-processing:** [PostCSS](https://postcss.org/) com `autoprefixer`.
- **Conjunto de Ícones:** [Heroicons](https://heroicons.com/) (v2.2.0)

## Autenticação e Segurança

- **Framework de Autenticação:** [NextAuth.js](https://next-auth.js.org/) (v4.24.11)
- **Adaptador de Banco de Dados (Auth):** `@auth/prisma-adapter` (v2.10.0) - _Indica o uso do Prisma como ORM na camada de dados, embora os arquivos do Prisma não estejam neste workspace._
- **Hashing de Senhas:** [bcrypt](https://github.com/kelektiv/node.bcrypt.js) (v5.1.1)

## Qualidade de Código e Ferramentas

- **Linting:** [ESLint](https://eslint.org/) (v8.57.1) com a configuração `next/core-web-vitals`.
- **Gerenciador de Pacotes (inferido):** NPM (devido à presença de `package-lock.json`).

## Build & Deploy

- **Plataforma de Deploy:** [Vercel](https://vercel.com/) (inferido pelo `README.md` e dependência de desenvolvimento).
