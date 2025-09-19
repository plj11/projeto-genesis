# Registro de Decisão: Fundação de Dados (packages/website)

**Data:** 2025-09-16
**Agente:** Directium_Architect
**Fase:** 5.1 - Avaliação da Fundação de Dados

## Contexto
O `packages/website` serve como a aplicação web principal e ponto de entrada para o projeto Gênesis, com foco em registro e autenticação de usuários. A stack tecnológica inclui Next.js, React e NextAuth.js com `@auth/prisma-adapter`.

## Padrão Avaliado
Arquitetura Dual-Core (OLTP + OLAP) com ETL em tempo real.

## Análise
Para o escopo atual do `packages/website`, as necessidades de dados são predominantemente transacionais (OLTP), focadas em operações como registro, login e gerenciamento de sessões de usuário. Embora o `@auth/prisma-adapter` indique a presença de um banco de dados, as demandas analíticas (OLAP) diretas do site são limitadas.

A implementação de uma arquitetura Dual-Core completa com ETL em tempo real introduziria uma complexidade significativa em termos de infraestrutura, desenvolvimento e manutenção, que não se justifica pelas necessidades atuais do `packages/website`.

## Decisão
**Rejeitar** a adoção da arquitetura Dual-Core (OLTP + OLAP) com ETL em tempo real para o escopo imediato do `packages/website`.

## Justificativa
*   **Excesso de Engenharia:** A complexidade e os custos associados a uma arquitetura Dual-Core completa superam os benefícios para as necessidades atuais de uma aplicação web de entrada e autenticação.
*   **Foco em OLTP:** As operações primárias do site são transacionais, e uma solução OLTP otimizada é suficiente.
*   **Escopo do Monorepo:** As necessidades analíticas mais amplas do projeto Gênesis (se existirem) podem ser atendidas por uma camada de dados analítica separada, que serviria a todo o monorepo, e não seria responsabilidade exclusiva do `packages/website`.

## Próximos Passos
Continuar com uma arquitetura de dados focada em OLTP para o `packages/website`, utilizando o Prisma para interação com o banco de dados transacional. A avaliação de uma arquitetura Dual-Core pode ser revisitada em um nível de monorepo para o projeto Gênesis como um todo, caso as necessidades de Business Intelligence e análise de dados em tempo real se tornem mais proeminentes para o sistema completo.
