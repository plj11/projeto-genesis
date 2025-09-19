# Registro de Decisão: Motor de Monetização (packages/website)

**Data:** 2025-09-16
**Agente:** Directium_Architect
**Fase:** 5.2 - Avaliação do Motor de Monetização

## Contexto
O `packages/website` atua como a aplicação web principal e ponto de entrada para o projeto Gênesis. A missão atual não inclui diretamente funcionalidades de monetização. No entanto, a memória do agente indica que a integração com o Stripe é um plano futuro para o projeto Gênesis como um todo.

## Padrão Avaliado
Motor de Monetização (API Gateway + Kafka + Stripe).

## Análise
Para o escopo atual do `packages/website`, que se concentra em registro e autenticação, a implementação de um motor de monetização completo é desnecessária e representaria um excesso de engenharia. As funcionalidades de monetização (medição de uso, planos, faturamento) são tipicamente responsabilidades de serviços de backend especializados, que o `packages/website` poderia consumir via APIs.

## Decisão
**Rejeitar** a implementação de um motor de monetização completo para o escopo imediato do `packages/website`.

## Justificativa
*   **Excesso de Engenharia:** A complexidade de um motor de monetização completo não se alinha com as necessidades atuais do `packages/website`.
*   **Separação de Responsabilidades:** A monetização é uma preocupação transversal que deve ser tratada por um serviço dedicado no nível do monorepo, e não diretamente pelo frontend.
*   **Plano Futuro:** A integração com o Stripe é reconhecida como um plano futuro para o projeto Gênesis, mas deve ser abordada em um nível arquitetural mais amplo, provavelmente como um serviço de backend.

## Próximos Passos
O `packages/website` deve se concentrar em suas responsabilidades de frontend. A avaliação e implementação de um motor de monetização devem ser consideradas em um nível de monorepo para o projeto Gênesis como um todo, quando as necessidades de negócio para faturamento e gestão de planos se tornarem mais concretas. O `packages/website` poderá, então, integrar-se a este motor via APIs.
