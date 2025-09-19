# BOOTSTRAP_MANIFEST.md v1.0 - packages/website

## 1. Declaração de Missão Refinada

Servir como a aplicação web principal e ponto de entrada para os usuários do projeto 'Gênesis'. As responsabilidades incluem gerenciar o registro e a autenticação de usuários, fornecer a interface de usuário principal e garantir uma experiência moderna, responsiva e escalável. O projeto é construído com Next.js e TypeScript, otimizado para deploy na plataforma Vercel.

## 2. Princípios Operacionais

Este agente opera sob os seguintes princípios, conforme a filosofia Directium:

*   **Agent-Based Software Engineering (ABSE):** Atua como um Núcleo Cognitivo, orquestrando e emulando uma hierarquia de agentes especializados (ex: Gemini_GQT para qualidade, Directium_Architect para arquitetura) para executar tarefas de engenharia de software.
*   **Swarm Intelligence:** As tarefas são abordadas determinando qual(is) agente(s) seriam mais adequados para a execução, garantindo especialização e eficiência.
*   **Layered Capabilities & Governance:** As operações são estruturadas em camadas (do CORE_ARCHITECTURE à INNOVATION), com cada ação alinhada a diretrizes e manifestos, garantindo incrementalidade e rastreabilidade.

## 3. Manifesto da Toolchain

As seguintes ferramentas foram integradas e confirmadas para o `packages/website`:

*   **[2025-09-16 16:26:17] - INTEGRATED: Prettier (Layer 1/Code Formatting) - Status: OK**
    *   **Propósito:** Garante um estilo de código consistente e automatizado.
*   **[2025-09-16 17:03:32] - INTEGRATED: Husky & Commitlint (Layer 1/Code Governance) - Status: OK**
    *   **Propósito:** Impõe padrões de mensagens de commit e executa verificações pré-commit para manter a qualidade do código.
*   **[2025-09-16 17:51:18] - INTEGRATED: Playwright (Layer 2/Testing) - Status: OK**
    *   **Propósito:** Habilita testes End-to-End (E2E) para validar fluxos completos da aplicação.

## 4. Blueprints Arquitetônicos

### 4.1. Fundação de Dados

**Decisão:** **Rejeitar** a adoção da arquitetura Dual-Core (OLTP + OLAP) com ETL em tempo real para o escopo imediato do `packages/website`.

**Justificativa:** Excesso de engenharia para as necessidades atuais de uma aplicação web de entrada e autenticação. As operações primárias são transacionais (OLTP). As necessidades analíticas mais amplas do projeto Gênesis devem ser tratadas em um nível de monorepo.

### 4.2. Motor de Monetização

**Decisão:** **Rejeitar** a implementação de um motor de monetização completo (API Gateway + Kafka + Stripe) para o escopo imediato do `packages/website`.

**Justificativa:** Excesso de engenharia e separação de responsabilidades. A monetização é uma preocupação transversal que deve ser tratada por um serviço dedicado no nível do monorepo. A integração com o Stripe é um plano futuro para o projeto Gênesis como um todo, a ser abordado em um nível arquitetural mais amplo.
