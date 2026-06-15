# Changelog

Todas as mudancas relevantes deste projeto serao documentadas neste arquivo.

O formato segue as recomendacoes de [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

- Documentacao inicial do projeto na raiz do repositorio.
- Analise de 3 code smells relevantes encontrados na aplicacao.
- Estrategias sugeridas de refatoracao para duplicacao de tipos, componentes com muitas responsabilidades e regras de estoque pouco expressivas.
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

### Removed

- Logs de debug do fluxo de cadastro/edicao de produtos no frontend.
- Dependencia `HashGenerator` injetada e nao utilizada no `EditUserUseCase`, eliminando acoplamento desnecessario (dead dependency).

### Planned

- Refatorar a representacao de metodos de pagamento para evitar duplicacao entre API e web.
- Extrair hooks/componentes menores dos dialogs de produto, venda e usuario.
- Centralizar regras de estoque em constantes e metodos de dominio.
- Remover logs de debug espalhados pelo frontend.
- Ampliar a cobertura de testes unitarios dos casos de venda e dashboard.
