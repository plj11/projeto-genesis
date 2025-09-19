# BOOTSTRAP DO PROJETO GÊNESIS

**DIRETIVA OBRIGATÓRIA PARA O AGENTE DE IA (GEMINI):**
*   **LEITURA OBRIGATÓRIA:** Você deve ler este documento na íntegra no início de cada nova sessão de desenvolvimento para carregar o contexto tecnológico atual do projeto.
*   **IMUTABILIDADE PARCIAL:** É proibido apagar ou sobrescrever informações neste documento. Todas as adições devem ser incrementais, adicionadas ao final da seção relevante. A única exceção é a substituição completa de uma tecnologia principal por outra (ex: trocar Neon por PlanetScale), caso em que a entrada antiga pode ser atualizada para refletir seu status como "Deprecada".

---

## A Verdade Sobre as Ferramentas e Tecnologias

Este documento é a fonte única de verdade sobre o stack tecnológico do Projeto Gênesis.

### 1. Infraestrutura e Deploy

*   **Ferramenta:** Vercel
*   **Versionamento:** `^48.0.0` (instalado via npm)
*   **Visão Fundamentada:** Plataforma de deploy otimizada para Next.js, com Global Edge Network para baixa latência, CI/CD integrado e "preview deployments" automáticos.
*   **Status:** `Integrado`

### 2. Banco de Dados

*   **Ferramenta:** Neon (PostgreSQL Serverless)
*   **Versionamento:** A ser definido (integrado com a Neon CLI).
*   **Visão Fundamentada:** Banco de dados PostgreSQL serverless que escala com o uso e oferece "branching" de banco de dados para desenvolvimento seguro e isolado.
*   **Status:** `Planejado`

### 3. Observabilidade e Monitoramento

*   **Ferramenta:** Sentry
*   **Versionamento:** A ser definido (integrado com o Sentry SDK/CLI).
*   **Visão Fundamentada:** Captura de erros em tempo real e monitoramento de performance (APM) para identificar e resolver problemas proativamente.
*   **Status:** `Planejado`

### 4. Pagamentos e Assinaturas

*   **Ferramenta:** Stripe
*   **Versionamento:** A ser definido (integrado com a Stripe CLI/SDK).
*   **Visão Fundamentada:** Plataforma líder de pagamentos com APIs robustas e amigáveis para desenvolvedores, cuidando de toda a complexidade de segurança e conformidade.
*   **Status:** `Planejado`

### 5. Testes End-to-End

*   **Ferramenta:** Playwright
*   **Versionamento:** A ser definido.
*   **Visão Fundamentada:** Framework de testes que simula a interação de um usuário real no navegador, garantindo a qualidade e a robustez dos fluxos críticos da aplicação.
*   **Status:** `Planejado`
