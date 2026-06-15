# Changelog

Todas as mudancas relevantes deste projeto serao documentadas neste arquivo.

O formato segue as recomendacoes de [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

- Documentacao inicial do projeto na raiz do repositorio.
- Analise de 6 code smells relevantes encontrados na aplicacao, distribuidos entre os 5 integrantes do grupo.
- Estrategias sugeridas de refatoracao para duplicacao de tipos, componentes com muitas responsabilidades e regras de estoque pouco expressivas.
- Documentacao e refatoracao do code smell 4 (paginacao com numero magico `20` repetido em todos os repositorios Prisma e `15` em `findManyWithLowQuantity`).
- Documentacao e refatoracao do code smell 5 (Anemic Domain Model nas entidades `Product` e `Sale`: setters publicos sem invariantes, `decreaseStock` sem guardas, casos de uso mutando `props` diretamente).
- Documentacao e refatoracao do code smell 6 (tipos de retorno mentirosos em `EditProductUseCase` e `EditSaleUseCase`, que declaravam `NameAlreadyInUseError` no `Either` mas nunca o lancavam).
- Constante `DEFAULT_PAGE_SIZE` e helper `toSkipTake(page)` em `api/src/core/repositories/pagination-params.ts`.
- Constante `LOW_STOCK_LIST_LIMIT` na entidade `Product` para substituir o literal `15` em `findManyWithLowQuantity`.
- Metodo `Product.updateDetails({ name, barcode, quantity, value })` com validacoes de invariantes via metodos privados `assertValidName`, `assertValidBarcode`, `assertValidQuantity` e `assertValidValue`.
- Metodo `Sale.updateDetails({ productId, sellerId, quantity, value, soldAt, paymentMethod })` com invariantes para vendas.
- Suite de testes unitarios `api/src/domain/stock/enterprise/entities/product.spec.ts` com 10 casos cobrindo `decreaseStock`, `increaseStock` e `updateDetails`.
- Suite de testes unitarios `api/src/domain/stock/application/use-cases/product/__tests/edit-product.spec.ts` com 3 casos cobrindo edicao com sucesso, produto inexistente e rejeicao de valor invalido.
- Lista inicial de testes existentes e sugestoes de novos testes para ampliar a cobertura.
- Instrucoes de instalacao, execucao, linter e cobertura.
- Testes unitarios para criacao de vendas com estoque suficiente e estoque insuficiente.
- Repositorio in-memory de vendas para apoiar testes de caso de uso.
- Registro do resultado local de testes e cobertura no README.

### Changed

- O README principal passa a descrever o sistema real, substituindo a ausencia de documentacao centralizada do repositorio.
- Casos de uso de venda passam a reutilizar o tipo `PaymentMethod` da entidade de dominio.
- Regras de estoque passam a usar metodos expressivos da entidade `Product`.
- Limite de estoque em risco passa a ser representado por uma constante nomeada.
- `EditSaleUseCase` corrigido: a logica duplicada de devolucao de estoque (que devolvia a quantidade em dobro) foi eliminada. Quando o produto da venda muda, o estoque agora e devolvido ao produto anterior correto (`sale.productId`) e descontado do novo produto, e o campo `sale.productId` passa a ser atualizado/persistido.
- Repositorios Prisma (`prisma-products-repository.ts`, `prisma-users-repository.ts`, `prisma-sales-repository.ts`, `prisma-tags-repository.ts` e `prisma-product-tags-repository.ts`) passam a usar `toSkipTake(page)` em vez do literal `20` para paginacao.
- Repositorios in-memory de teste passam a usar `DEFAULT_PAGE_SIZE` em suas implementacoes de `findMany`, alinhando o comportamento ao da producao.
- `Product.decreaseStock(quantity)` passa a validar `quantity > 0` e a recusar operacoes que deixariam o estoque negativo, usando `hasAvailableStock` internamente.
- `Product.increaseStock(quantity)` passa a validar `quantity > 0`, impedindo decrementos disfarcados.
- `EditProductUseCase` passa a chamar `product.updateDetails(...)` em vez de atribuir cada `props` diretamente, garantindo invariantes na entidade.
- `EditSaleUseCase` passa a chamar `sale.updateDetails(...)`, eliminando a serie de atribuicoes manuais e protegendo as invariantes de venda.
- Tipos de retorno de `EditProductUseCase` e `EditSaleUseCase` passam a refletir apenas os erros realmente lancados (`Either<ResourceNotFoundError, ...>`), removendo a mencao a `NameAlreadyInUseError` que nunca ocorria.

### Removed

- Logs de debug do fluxo de cadastro/edicao de produtos no frontend.
- Dependencia `HashGenerator` injetada e nao utilizada no `EditUserUseCase`, eliminando acoplamento desnecessario (dead dependency).
- Literal `20` (numero magico de paginacao) das chamadas `findMany` dos repositorios Prisma e in-memory.
- Literal `15` (limite da listagem de estoque baixo) em `findManyWithLowQuantity`, substituido pela constante `LOW_STOCK_LIST_LIMIT`.
- Import morto de `NameAlreadyInUseError` em `edit-product.ts` e `edit-sale.ts`, junto com a referencia desse erro nos respectivos tipos de retorno.
- Import nao utilizado de `UniqueEntityId` em `get-product-by-id.spec.ts` (erro de lint pre-existente).

### Planned

- Refatorar a representacao de metodos de pagamento para evitar duplicacao entre API e web (smell 1).
- Extrair hooks/componentes menores dos dialogs de produto, venda e usuario (smell 2).
- Tornar `User` rica tambem (separar senha em texto do hash via `changePassword`) e expandir os metodos de dominio de `Sale`.
- Ampliar a cobertura de testes unitarios dos casos de venda, dashboard e dos controllers.
