# Stock System

Sistema de controle de estoque com API em NestJS e interface web em Next.js. A aplicacao permite cadastrar usuarios, produtos, tags e vendas, alem de exibir metricas de estoque e vendas no dashboard.

## Principais funcionalidades

- Cadastro, listagem, edicao e remocao de produtos.
- Cadastro, listagem, edicao e remocao de usuarios.
- Registro de vendas com produto, vendedor, quantidade, data e metodo de pagamento.
- Dashboard com metricas de faturamento, estoque em falta, estoque em risco e vendas por vendedor/produto.
- Autenticacao de usuario e protecao de rotas.

## Analise inicial de code smells

Esta secao documenta 3 exemplos de smells encontrados na aplicacao. A mesma estrutura pode ser repetida pelo restante do grupo para chegar aos 6+ smells exigidos no trabalho.

### 1. Duplicacao de regras e tipos de metodo de pagamento

**Arquivos envolvidos:**

- `api/src/domain/stock/enterprise/entities/sale.ts`
- `api/src/domain/stock/application/use-cases/sale/create-sale.ts`
- `api/src/domain/stock/application/use-cases/sale/edit-sale.ts`
- `api/src/infra/http/controllers/sale/dto/create-sale.dto.ts`
- `api/src/infra/http/controllers/sale/dto/edit-sale.dto.ts`
- `web/app/_constants/sale.ts`
- `web/app/sales/_actions/upsert-sale/schema.ts`
- `web/app/sales/_components/upsert-sale-dialog.tsx`

**Problema:** os valores aceitos para `PaymentMethod` aparecem repetidos em varias camadas do backend e tambem no frontend. Isso cria risco de divergencia: ao adicionar um novo metodo de pagamento, e necessario lembrar de alterar varios pontos manualmente.

**Principios relacionados:** DRY, Single Source of Truth e baixo acoplamento.

**Estrategia de refatoracao:** centralizar o contrato de metodos de pagamento em um unico modulo compartilhado, ou gerar/derivar os tipos a partir do schema do Prisma/API. No frontend, manter apenas labels de exibicao e consumir o tipo oficial.

**Resultado esperado:** menor duplicacao, menor risco de bug ao alterar regras de venda e codigo mais facil de manter.

### 2. Componente de formulario com responsabilidade demais

**Arquivos envolvidos:**

- `web/app/products/_components/upsert-product-dialog.tsx`
- `web/app/sales/_components/upsert-sale-dialog.tsx`
- `web/app/users/_components/upsert-user-dialog.tsx`

**Problema:** os componentes de dialog concentram validacao, estado local, carregamento de dados, envio para actions, tratamento de erros e renderizacao da interface. No caso de vendas, o componente tambem carrega usuarios e produtos dentro do proprio dialog.

**Principios relacionados:** Single Responsibility Principle, funcoes pequenas e separacao de niveis de abstracao.

**Estrategia de refatoracao:** separar responsabilidades em hooks e componentes menores. Exemplos:

- `useSaleForm` para estado, validacao e submit.
- `useSaleOptions` para carregar usuarios e produtos.
- `SaleFormFields` para renderizar os campos.
- Schemas Zod compartilhados entre action e formulario quando fizer sentido.

**Resultado esperado:** componentes menores, mais testaveis e mais simples de alterar sem quebrar outras partes da tela.

### 3. Numeros magicos e condicoes pouco expressivas em regras de estoque

**Arquivos envolvidos:**

- `api/src/domain/stock/application/use-cases/sale/create-sale.ts`
- `api/src/infra/database/prisma/repositories/prisma-dashboard-repository.ts`
- `api/src/infra/database/prisma/repositories/prisma-products-repository.ts`

**Problema:** regras importantes aparecem embutidas diretamente no codigo, como o limite de estoque em risco `10` e a validacao `product.quantity < quantity && product.quantity - quantity < 0`. A condicao de venda tambem e redundante, porque `product.quantity < quantity` ja indica que a quantidade solicitada excede o estoque disponivel.

**Principios relacionados:** nomes significativos, intencao explicita e evitar duplicacao de conhecimento.

**Estrategia de refatoracao:** criar constantes e metodos de dominio com nomes que expliquem a regra. Exemplos:

- `LOW_STOCK_THRESHOLD = 10`
- `product.hasAvailableStock(quantity)`
- `product.decreaseStock(quantity)`

**Resultado esperado:** regras de negocio legiveis, reutilizaveis e protegidas por testes unitarios.

## Estrategias de refatoracao propostas

1. Criar branch `original` apontando para o estado antigo do projeto.
2. Manter a branch `main` com a versao refatorada.
3. Refatorar por modulo, com commits pequenos e mensagens claras.
4. Priorizar smells com impacto em manutencao: duplicacao, componentes grandes, numeros magicos, logs de debug, nomes inconsistentes e testes frageis.
5. Rodar linter e testes a cada etapa para evitar regressao.

## Refatoracoes aplicadas na branch main

- A branch `original` foi criada para preservar a versao antiga do projeto.
- A branch `main` concentra as refatoracoes e documentacao da entrega.
- O tipo `PaymentMethod` passou a ser reutilizado nos casos de uso de venda, reduzindo duplicacao de unions literais.
- A regra de estoque disponivel foi movida para metodos expressivos da entidade `Product`, como `hasAvailableStock` e `decreaseStock`.
- O limite de estoque em risco foi nomeado com `LOW_STOCK_THRESHOLD`, removendo o numero magico `10` dos repositorios.
- Logs de debug foram removidos do fluxo de cadastro/edicao de produtos no frontend.
- Foram adicionados testes unitarios para criacao de venda com estoque suficiente e rejeicao de venda com estoque insuficiente.
- Removida dependencia morta (`dead dependency`): o `EditUserUseCase` injetava `HashGenerator` no construtor sem nunca utiliza-lo. Como a edicao de usuario altera apenas `name` e `login`, a dependencia foi removida, reduzindo acoplamento falso.
- Corrigida duplicacao de logica e bug de estoque no `EditSaleUseCase`. A chamada `product.increaseStock(sale.quantity)` aparecia duplicada, devolvendo o estoque em dobro, e, ao trocar o produto da venda, o estoque era restaurado no produto errado (o novo, em vez do antigo). Agora, quando o produto muda, carrega-se o produto anterior (`sale.productId`) para devolver o estoque a ele e desconta-se do novo produto; quando o produto e o mesmo, a devolucao e o desconto ocorrem no mesmo registro. O campo `sale.productId`, que nao era persistido apos a troca, passou a ser atualizado.

## Divisao sugerida para 5 integrantes

O enunciado pede grupos de 3 a 4 integrantes, entao e importante validar o grupo de 5 com o professor. Caso ele aceite, uma divisao equilibrada de participacao pode ser:

1. Integrante 1: analise de smells no backend e refatoracao das regras de venda/estoque.
2. Integrante 2: analise de smells no frontend e refatoracao dos formularios/dialogs.
3. Integrante 3: criacao e ajuste dos testes unitarios com Vitest.
4. Integrante 4: linter, padronizacao de codigo e revisao de nomes/organizacao.
5. Integrante 5: README, CHANGELOG, comparacao entre branches e preparacao da apresentacao.

## Testes implementados

O backend ja possui uma base de testes unitarios com Vitest para casos de uso e entidades, por exemplo:

- `api/src/domain/stock/application/use-cases/user/__tests/create-user.spec.ts`
- `api/src/domain/stock/application/use-cases/product/__tests/list-products.spec.ts`
- `api/src/domain/stock/application/use-cases/product/__tests/create-product-with-tags.spec.ts`
- `api/src/domain/stock/application/use-cases/sale/__tests/create-sale.spec.ts`
- `api/src/core/either.spec.ts`
- `api/src/core/entities/watched-list.spec.ts`

Para atingir a meta aproximada de 50% de cobertura, os proximos testes recomendados sao:

- venda com estoque suficiente;
- venda com estoque insuficiente;
- atualizacao de estoque apos venda;
- edicao de produto mantendo tags existentes;
- validacao de metodos de pagamento;
- carregamento de metricas do dashboard.

Comando sugerido para cobertura:

```bash
cd api
pnpm run test:cov
```

Resultado da ultima execucao local:

- Testes unitarios: 13 arquivos passaram, 26 testes passaram.
- Cobertura geral da API: 20,21% de statements, 55,23% de branches, 45,95% de funcoes e 20,21% de linhas.

Como a cobertura geral ainda nao chega aos 50%, a divisao de trabalho sugerida para o grupo inclui a criacao de novos testes nos modulos de vendas, dashboard, tags e controllers. A entrega atual deixa a infraestrutura de testes funcionando e serve como modelo para os demais integrantes ampliarem a cobertura.

## Linter e formatacao

Backend:

```bash
cd api
pnpm run lint
pnpm run format
```

Frontend:

```bash
cd web
npm run lint
```

## Instalacao e execucao

API:

```bash
cd api
pnpm install
pnpm run start:dev
```

Web:

```bash
cd web
npm install
npm run dev
```

Antes de executar, crie os arquivos `.env` a partir dos exemplos:

- `api/.env.example`
- `web/.env.example`
