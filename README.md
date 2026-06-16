# Stock System

Sistema de controle de estoque com API em NestJS e interface web em Next.js. A aplicacao permite cadastrar usuarios, produtos, tags e vendas, alem de exibir metricas de estoque e vendas no dashboard.

## Principais funcionalidades

- Cadastro, listagem, edicao e remocao de produtos.
- Cadastro, listagem, edicao e remocao de usuarios.
- Registro de vendas com produto, vendedor, quantidade, data e metodo de pagamento.
- Dashboard com metricas de faturamento, estoque em falta, estoque em risco e vendas por vendedor/produto.
- Autenticacao de usuario e protecao de rotas.

## Analise inicial de code smells

Esta secao documenta 9 exemplos de smells encontrados na aplicacao, atendendo ao minimo exigido no enunciado do trabalho.

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

### 4. Numero magico de paginacao (`20`) duplicado em todos os repositorios Prisma

**Arquivos envolvidos:**

- `api/src/infra/database/prisma/repositories/prisma-sales-repository.ts`
- `api/src/infra/database/prisma/repositories/prisma-users-repository.ts`
- `api/src/infra/database/prisma/repositories/prisma-products-repository.ts`
- `api/src/infra/database/prisma/repositories/prisma-tags-repository.ts`
- `api/src/infra/database/prisma/repositories/prisma-product-tags-repository.ts`

**Problema:** o tamanho de pagina aparece como literal `20` em todas as chamadas `findMany`, sempre na mesma combinacao `skip: (page - 1) * 20, take: 20`. Alem disso, o metodo `findManyWithLowQuantity` fixa um outro numero magico (`take: 15`) sem explicacao. O conhecimento "quantos itens por pagina" esta espalhado pelo codigo, o que dificulta a manutencao: alterar o tamanho da pagina exige editar varios arquivos e ainda corre o risco de algum repositorio ficar fora do padrao.

**Principios relacionados:** evitar numeros magicos, nomes significativos, DRY e Single Source of Truth.

**Estrategia de refatoracao:** extrair os valores para constantes nomeadas em um modulo compartilhado, por exemplo:

- `DEFAULT_PAGE_SIZE = 20` em `api/src/core/repositories/pagination-params.ts`.
- `LOW_STOCK_LIST_LIMIT = 15` proximo ao dominio de estoque (ou parametro do caso de uso).
- Helper utilitario `toSkipTake(page)` para encapsular o calculo `skip: (page - 1) * size, take: size`, evitando repetir a aritmetica em cada repositorio.

**Resultado esperado:** o tamanho da pagina passa a ter um nome unico, claro e centralizado, eliminando a duplicacao do calculo `(page - 1) * 20` em cinco arquivos e reduzindo o risco de bugs ao ajustar regras de paginacao.

### 5. Anemic Domain Model: entidades com setters publicos e sem invariantes

**Arquivos envolvidos:**

- `api/src/domain/stock/enterprise/entities/product.ts`
- `api/src/domain/stock/enterprise/entities/sale.ts`
- `api/src/domain/stock/enterprise/entities/user.ts`
- `api/src/domain/stock/application/use-cases/product/edit-product.ts`
- `api/src/domain/stock/application/use-cases/sale/edit-sale.ts`

**Problema:** as entidades de dominio (`Product`, `Sale`, `User`) expoem setters publicos para praticamente todos os campos, sem qualquer validacao de invariante. Alguns exemplos concretos:

- `Product` permite atribuir `quantity` ou `value` negativos via `product.quantity = -10` ou `product.value = -1` sem reclamar.
- `Product.decreaseStock(quantity)` nao verifica se `quantity` e positivo nem se o estoque resultante ficaria negativo (a regra `hasAvailableStock` so existe se o caso de uso lembrar de chama-la).
- `Sale` deixa qualquer outra camada alterar `value`, `quantity`, `productId`, `sellerId`, `paymentMethod`, etc., sem regras.
- `User` permite alterar `password` direto via setter, sem garantir que esteja hashada (a propria entidade nao distingue senha em texto de hash).
- Casos de uso como `EditProductUseCase` apenas fazem `product.name = name; product.barcode = barcode; product.quantity = quantity; product.value = value`, ou seja, a logica de negocio "valida" mora no caso de uso (quando mora), e nao na entidade. A entidade vira basicamente um struct.

**Principios relacionados:** encapsulamento, Tell Don't Ask, modelagem rica de dominio (evitar Anemic Domain Model), Single Responsibility Principle e protecao de invariantes.

**Estrategia de refatoracao:**

- Tornar a maior parte dos setters privados ou protected e substituir por metodos com nomes de dominio (`rename`, `changeBarcode`, `adjustStock`, `applyPaymentMethod`, etc.).
- Centralizar as regras na entidade: `Product.decreaseStock(quantity)` deve lancar/retornar erro se `quantity <= 0` ou se o estoque ficaria negativo, em vez de depender do `hasAvailableStock` ser chamado por fora.
- Em `User`, separar o conceito de senha em texto (entrada) do hash armazenado; idealmente expor apenas um metodo `changePassword(hashGenerator, newPassword)`.
- Em `Sale`, criar um metodo `updateDetails({ quantity, productId, sellerId, soldAt, paymentMethod, value })` que aplica todas as alteracoes de uma vez e protege as invariantes (valor coerente com quantidade e produto, etc.).
- Refatorar os casos de uso (`EditProductUseCase`, `EditSaleUseCase`) para chamar esses metodos da entidade em vez de mutar `props` diretamente.

**Resultado esperado:** entidades de dominio mais ricas, com regras de negocio coesas e protegidas, casos de uso mais magros e menor chance de salvar dados invalidos no banco (por exemplo, um produto com estoque negativo ou uma venda inconsistente).

### 6. Tipos de retorno mentirosos: erros declarados e nunca lancados (Misleading Type Signature)

**Arquivos envolvidos:**

- `api/src/domain/stock/application/use-cases/product/edit-product.ts`
- `api/src/domain/stock/application/use-cases/sale/edit-sale.ts`

**Problema:** os tipos de resposta dos casos de uso declaram erros que nunca sao realmente retornados:

```ts
type EditProductUseCaseResponse = Either<
  ResourceNotFoundError | NameAlreadyInUseError,
  { product: Product }
>
```

```ts
type EditSaleUseCaseResponse = Either<
  ResourceNotFoundError | NameAlreadyInUseError,
  { sale: Sale }
>
```

Tanto `EditProductUseCase` quanto `EditSaleUseCase` importam e declaram em seus contratos a possibilidade de retornar `NameAlreadyInUseError`, mas em nenhum momento do `execute()` esse erro e instanciado. O caso de uso so retorna `ResourceNotFoundError`. Isso confunde o leitor (sugere uma regra de negocio que nao existe), induz quem escreve o controller a tratar um caso impossivel (codigo morto) e forca a manutencao de um `import` desnecessario (acoplamento falso entre modulos).

**Principios relacionados:** "Tell the truth" / nomes e tipos honestos, evitar dead code, baixo acoplamento e principio da menor surpresa.

**Estrategia de refatoracao:**

- Se a regra "nome ja em uso" faz sentido para esses casos de uso, implementa-la de verdade (validar duplicidade antes de salvar e retornar `left(new NameAlreadyInUseError(name))`).
- Caso contrario, remover `NameAlreadyInUseError` do tipo de retorno e do `import` em `edit-product.ts` e `edit-sale.ts`, deixando apenas `ResourceNotFoundError`.
- Garantir que os controllers correspondentes nao tentem mapear um erro que nunca acontece.

**Resultado esperado:** assinaturas honestas, ausencia de dead code/dead imports e contratos de caso de uso que descrevem exatamente os cenarios reais de falha.

### 10. Instrucoes de debug (`console.log`) em codigo de producao

**Arquivos envolvidos:**

- `web/app/sales/_components/upsert-sale-dialog.tsx`
- `web/app/products/_components/upsert-product-dialog.tsx`
- `web/app/users/_components/upsert-user-dialog.tsx`
- `web/app/sales/_actions/upsert-sale/index.ts`

**Problema:** chamadas `console.log` e `console.error` em blocos `catch` de componentes de formulario e na server action `upsertSale`. No caso mais grave (`upsertSale`), o erro era capturado e apenas impresso no console sem ser relancado, fazendo com que o caller nunca soubesse da falha e exibisse um estado de sucesso ao usuario mesmo quando a requisicao falhava.

**Principios relacionados:** nao usar output de debug em codigo de producao, nao silenciar erros (Don't Swallow Errors), separacao entre logging de diagnose e feedback ao usuario.

**Estrategia de refatoracao:** remover os blocos `catch` que so continham `console.log`. Na server action, retirar o `try/catch` inteiro para que erros se propagam naturalmente ao caller (o `onSubmit` do dialog, que ja possui tratamento correto com `toast.error`). Nos dialogs, substituir o `console.log` por `toast.error` com mensagem contextualizada e usar `catch` sem variavel de excecao vinculada quando ela nao e utilizada.

**Resultado esperado:** erros de rede ou de validacao chegam ao usuario via notificacao visual; o console de producao fica limpo de output de diagnostico; o fluxo de controle de erros e explicito e rastreavel.

### 11. Dois `useEffect` para o mesmo gatilho (`isOpen`) — violacao de DRY

**Arquivos envolvidos:**

- `web/app/sales/_components/upsert-sale-dialog.tsx`

**Problema:** o componente `UpsertSaleDialog` registrava dois `useEffect` separados, ambos com a mesma dependencia `[isOpen]` e a mesma condicao `if (isOpen)`, para disparar `listUsers()` e `listProducts()`. Ter dois hooks que reagem ao mesmo evento e executam acoes complementares e uma violacao do principio DRY: qualquer alteracao na logica de abertura do dialog (adicionar loading state, checar autorizacao, etc.) exige editar dois lugares.

**Principios relacionados:** DRY (Don't Repeat Yourself), coesao — acoes que pertencem ao mesmo evento devem ser agrupadas.

**Estrategia de refatoracao:** mesclar os dois `useEffect` em um unico bloco que chama `listUsers()` e `listProducts()` sequencialmente quando `isOpen` for verdadeiro.

**Resultado esperado:** um unico ponto de controle para a logica de carregamento ao abrir o dialog, eliminando o risco de inconsistencia entre os dois efeitos e simplificando futuras alteracoes.

### 12. Campo `soldAt` ausente no schema da server action `upsertSale`

**Arquivos envolvidos:**

- `web/app/sales/_actions/upsert-sale/schema.ts`
- `web/app/sales/_components/upsert-sale-dialog.tsx`

**Problema:** o schema Zod do formulario no dialog declarava o campo `soldAt: z.date()`, mas o schema da server action (`upsertSaleSchema`) nao incluia esse campo. O formulario passava `soldAt` para `upsertSale` via spread (`{ ...data, id: saleId }`), mas o TypeScript nao reclamava porque o campo extra nao esta no tipo declarado — ele simplesmente passava sem validacao ou tipagem no contrato da funcao servidor. Isso viola o principio de Single Source of Truth e cria um campo "invisivel" que e enviado a API sem ser reconhecido pelo schema.

**Principios relacionados:** Single Source of Truth, contratos honestos de interface, seguranca de tipos (type safety) de ponta a ponta.

**Estrategia de refatoracao:** adicionar `soldAt: z.date()` ao `upsertSaleSchema` para que o contrato da server action reflita todos os campos que ela efetivamente recebe e encaminha para a API.

**Resultado esperado:** o campo `soldAt` e validado e tipado em toda a cadeia (formulario → action → API), eliminando a divergencia entre o schema do formulario e o da action.

### Refatoracoes da pasta web (code smells adicionais)

- **Codigo duplicado em `upsertProduct`** (`web/app/products/_actions/upsert-product/index.ts`): as chamadas `revalidatePath("/")` e `revalidatePath("/products")` estavam repetidas nos dois branches (`if` para update e o caminho de create). O condicional foi reescrito como `if/else` e os `revalidatePath` foram movidos para apos o bloco, sendo chamados uma unica vez independentemente do caminho executado.

- **Codigo morto em `Navbar`** (`web/app/_components/navbar.tsx`): havia dois blocos de codigo comentado sem proposito: um `useState` com tipo complexo de sessao de usuario e uma funcao `getServerUserSession` que chamava `getUserSession` e fazia `console.log`. Ambos foram removidos, deixando o componente limpo.

- **Nomenclatura incorreta em `sales/page.tsx`** (`web/app/sales/page.tsx`): a funcao exportada se chamava `UsersPage` e a variavel que recebia o resultado de `getSales()` se chamava `users`, gerando confusao sobre o dominio da pagina. Ambos foram renomeados para `SalesPage` e `sales`, respectivamente.

### Refatoracoes dos smells 10, 11 e 12 (instrucoes de debug, useEffect duplicados e schema incompleto)

- Removidos todos os `console.log` e `console.error` dos blocos `catch` dos dialogs de venda, produto e usuario, substituindo por `toast.error` com mensagem contextualizada quando o usuario precisa ser informado do erro.
- Removido o `try/catch` da server action `upsertSale` que silenciava erros: a funcao agora deixa a excecao propagar ao caller (`onSubmit` do dialog), onde ja existe tratamento adequado com notificacao visual.
- Os dois `useEffect` em `UpsertSaleDialog` que compartilhavam a mesma dependencia `[isOpen]` foram mesclados em um unico efeito, eliminando a duplicacao de logica de carregamento ao abrir o dialog.
- O campo `soldAt` foi adicionado ao `upsertSaleSchema` em `web/app/sales/_actions/upsert-sale/schema.ts`, alinhando o contrato da server action com o schema do formulario e garantindo validacao e tipagem de ponta a ponta.

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

### Refatoracoes do smell 4 (numero magico de paginacao)

- Criadas a constante `DEFAULT_PAGE_SIZE = 20` e a funcao helper `toSkipTake(page)` em `api/src/core/repositories/pagination-params.ts`.
- O literal `20` foi removido das chamadas `findMany` de todos os repositorios Prisma (`prisma-products-repository.ts`, `prisma-users-repository.ts`, `prisma-sales-repository.ts`, `prisma-tags-repository.ts` e `prisma-product-tags-repository.ts`), que passaram a delegar ao helper `toSkipTake(page)`.
- O numero magico `15` em `findManyWithLowQuantity` foi nomeado como `LOW_STOCK_LIST_LIMIT` na entidade `Product`, e o repositorio Prisma passou a usar a constante.
- Os repositorios in-memory de teste (`in-memory-products-repository.ts`, `in-memory-users-repository.ts`, `in-memory-sales-repository.ts`, `in-memory-tags-repository.ts` e `in-memory-productsTags-repository.ts`) tambem passaram a usar `DEFAULT_PAGE_SIZE` para manter o comportamento alinhado ao da producao.

### Refatoracoes do smell 5 (Anemic Domain Model)

- `Product.decreaseStock(quantity)` agora valida `quantity > 0` e usa `hasAvailableStock` internamente, lancando erro se a operacao resultaria em estoque negativo. A regra de "estoque nao pode ficar negativo" deixou de depender do caso de uso lembrar de checar.
- `Product.increaseStock(quantity)` agora valida `quantity > 0`, impedindo decrementos disfarcados de incremento.
- Adicionado o metodo `Product.updateDetails({ name, barcode, quantity, value })` com validacoes de invariantes (nome e barcode nao vazios, quantity >= 0, value > 0). As validacoes ficam em metodos estaticos privados (`assertValidName`, `assertValidBarcode`, `assertValidQuantity`, `assertValidValue`).
- Adicionado o metodo `Sale.updateDetails({ productId, sellerId, quantity, value, soldAt, paymentMethod })` com invariantes equivalentes para vendas.
- O `EditProductUseCase` passou a chamar `product.updateDetails(...)` em vez de atribuir cada `props` diretamente, deixando o caso de uso mais magro e protegendo o dominio contra dados invalidos.
- O `EditSaleUseCase` passou a chamar `sale.updateDetails(...)`, eliminando a serie de atribuicoes manuais (`sale.productId = ... sale.quantity = ... sale.value = ...`) e reduzindo o risco de esquecer um campo.
- Adicionados 10 testes unitarios novos para as invariantes da entidade `Product` em `api/src/domain/stock/enterprise/entities/product.spec.ts`, cobrindo `decreaseStock`, `increaseStock` e `updateDetails`.
- Adicionados 3 testes unitarios novos para `EditProductUseCase` em `api/src/domain/stock/application/use-cases/product/__tests/edit-product.spec.ts`, cobrindo edicao com sucesso, produto inexistente e rejeicao de valor invalido.

### Refatoracoes do smell 6 (tipos de retorno mentirosos)

- O tipo de retorno de `EditProductUseCase` deixou de declarar `NameAlreadyInUseError` no `Either`, ja que o caso de uso nunca lancava esse erro. O import morto foi removido.
- A mesma correcao foi aplicada a `EditSaleUseCase`. Os contratos dos casos de uso agora descrevem apenas os erros que efetivamente podem ocorrer (`ResourceNotFoundError`).
- O erro de lint pre-existente em `get-product-by-id.spec.ts` (`UniqueEntityId` importado e nao utilizado) foi corrigido durante a passagem do linter.

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

Resultado da ultima execucao local apos as refatoracoes do integrante 4:

- Testes unitarios: 15 arquivos passaram, 39 testes passaram (acrescimo de 2 arquivos e 13 testes novos sobre invariantes de `Product` e edicao de produto).
- Apos as refatoracoes do smell 5 (Anemic Domain Model), os novos testes em `product.spec.ts` cobrem `decreaseStock`, `increaseStock` e `updateDetails` com seus respectivos cenarios de invariante violada.
- Apos as refatoracoes do smell 6, os tipos de retorno dos casos de uso de edicao deixaram de mentir sobre os erros que podem ocorrer, o que tambem facilitou os testes (so e necessario validar o caminho real).

Como a cobertura geral ainda pode crescer, a divisao de trabalho sugerida para o grupo inclui a criacao de novos testes nos modulos de vendas, dashboard, tags e controllers. A entrega atual deixa a infraestrutura de testes funcionando e serve como modelo para os demais integrantes ampliarem a cobertura.

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
