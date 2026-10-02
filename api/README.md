# Teste de API — JSONPlaceholder

Base URL: `https://jsonplaceholder.typicode.com/`

## 1. GET /posts/1

Validações configuradas na collection:

- Status HTTP 200
- `id` igual a 1
- `userId` igual a 1

Valido o status porque ele mostra se a requisição foi processada com sucesso. Também valido `id` e `userId` porque são dados do recurso solicitado e ajudam a confirmar que não recebi apenas uma resposta 200, mas o recurso esperado.

## 2. GET /posts/999999

É o cenário negativo solicitado pelo desafio. A ideia é observar o status e o corpo retornados para um recurso inexistente e comparar com o comportamento esperado da API.

Um status de erro esperado não significa que o teste falhou. O teste só deve ser considerado falho quando a resposta estiver diferente do contrato/comportamento esperado.

## Observação

Não foram inventados status ou corpos de resposta para o segundo cenário. A collection deixa a requisição pronta para execução no Postman.
