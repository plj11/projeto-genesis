# PROJETO GÊNESIS

**SUA PLATAFORMA VISUAL PARA CRIAÇÃO DE APLICAÇÕES WEB. TRANSFORME SUAS IDEIAS EM REALIDADE.**

---

## O Que é o Gênesis?

No vasto mar digital, muitas ideias naufragam antes de ver a luz do dia. O Gênesis nasceu da frustração com a complexidade técnica, para ser a sua tela em branco e o seu motor de inovação. 

Nossa missão é simples: democratizar a criação digital, permitindo que qualquer pessoa, independentemente da habilidade técnica, possa dar vida às suas ideias com liberdade, intuição e excelência através de uma plataforma visual e assistida por IA.

## Funcionalidades Principais

*   **Construção Visual Intuitiva:** Uma interface de arrastar e soltar para construir páginas e aplicações sem escrever código.
*   **Geração de Layout por IA:** Descreva o que você quer, e nossa IA irá gerar um layout completo usando nossa biblioteca de componentes.
*   **Publicação Simplificada:** Integração nativa com a Vercel para fazer o deploy e publicar seu site com um único clique.
*   **Componentes Reutilizáveis:** Uma vasta biblioteca de blocos de construção prontos para usar e personalizar.

## Tecnologias Utilizadas

*   **Frontend:** Next.js, React, TypeScript, Tailwind CSS
*   **Backend:** Next.js (API Routes), TypeScript
*   **Banco de Dados:** Prisma, Vercel Postgres
*   **Hospedagem:** Vercel

## Estado Atual do Projeto

O projeto está em desenvolvimento ativo. Atualmente, as seguintes funcionalidades estão implementadas como parte da fundação da plataforma web:

- [x] Estrutura Monorepo com o website principal em `packages/website`.
- [x] Dashboard inicial (provisório) para visualização dos sites do usuário.
- [x] Sistema de criação de sites (formulário e rota de API) para registro de novos projetos no banco de dados.
- [ ] **Próximo Passo:** Desenvolvimento do Editor Visual, a tela principal de construção de páginas.

## Como Começar (Ambiente de Desenvolvimento)

Para contribuir com o desenvolvimento do Gênesis, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/plj11/projeto-genesis.git
    cd projeto-genesis
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    *   Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.
    *   Preencha as variáveis no arquivo `.env`, principalmente a `DATABASE_URL` que você obterá do Vercel Postgres.

4.  **Rode as migrações do banco de dados:**
    ```bash
    npx prisma migrate dev
    ```

5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev --workspace=packages/website
    ```

## Licença

Este projeto é distribuído sob a licença MIT.
