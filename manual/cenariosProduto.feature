# Cenários manuais em Gherkin

Feature: Produtos, carrinho, checkout e navegação

Background:
Given que estou na tela de login
And informo o usuário "standard_user"
And informo a senha "secret_sauce"
When clico em "Login"
Then devo acessar a página de produtos

# Produtos

Scenario: Visualizar produtos após realizar login
Given que estou na página de produtos
Then devo visualizar a lista de produtos
And cada produto deve apresentar nome
And cada produto deve apresentar preço
And cada produto deve possuir o botão "Add to cart"

Scenario: Adicionar um produto ao carrinho
Given que estou na página de produtos
When clico no botão "Add to cart" de um produto
Then o produto deve ser adicionado ao carrinho
And o botão deve ser alterado para "Remove"
And o contador do carrinho deve ser atualizado

Scenario: Adicionar mais de um produto ao carrinho
Given que estou na página de produtos
When adiciono dois produtos ao carrinho
Then os dois produtos devem ser adicionados ao carrinho
And o contador do carrinho deve apresentar "2"

Scenario: Remover um produto diretamente da página de produtos
Given que estou na página de produtos
And adicionei um produto ao carrinho
When clico no botão "Remove" do produto
Then o produto deve ser removido do carrinho
And o botão deve ser alterado para "Add to cart"

# Detalhes do produto

Scenario: Acessar os detalhes de um produto
Given que estou na página de produtos
When clico no nome de um produto
Then devo acessar a página de detalhes do produto
And devo visualizar o nome do produto
And devo visualizar o preço do produto
And devo visualizar a descrição do produto
And devo visualizar a imagem do produto

Scenario: Adicionar produto ao carrinho pela tela de detalhes
Given que estou na página de detalhes de um produto
When clico no botão "Add to cart"
Then o produto deve ser adicionado ao carrinho
And o contador do carrinho deve ser atualizado

Scenario: Remover produto pela tela de detalhes
Given que estou na página de detalhes de um produto
And o produto está adicionado ao carrinho
When clico no botão "Remove"
Then o produto deve ser removido do carrinho

Scenario: Retornar para produtos pela tela de detalhes
Given que estou na página de detalhes de um produto
When clico no botão "Back to products"
Then devo retornar para a página de produtos

# Menu hambúrguer

Scenario: Abrir o menu lateral
Given que estou na página de produtos
When clico no botão do menu hambúrguer
Then devo visualizar as opções "All Items", "About", "Logout" e "Reset App State"

Scenario: Acessar All Items pelo menu
Given que estou na página de produtos
And abri o menu lateral
When clico em "All Items"
Then devo retornar para a página de produtos
And devo visualizar a lista de produtos

Scenario: Acessar About pelo menu
Given que estou na página de produtos
And abri o menu lateral
When clico em "About"
Then devo ser direcionado para "https://saucelabs.com/"

Scenario: Realizar logout pelo menu
Given que estou na página de produtos
And abri o menu lateral
When clico em "Logout"
Then devo ser direcionado para a página de login
And minha sessão deve ser encerrada

Scenario: Resetar o estado da aplicação pelo menu
Given que estou na página de produtos
And abri o menu lateral
When clico em "Reset App State"
Then o estado da aplicação deve ser resetado

# Carrinho

Scenario: Acessar o carrinho com produto adicionado
Given que estou na página de produtos
And adicionei um produto ao carrinho
When clico no ícone do carrinho
Then devo acessar a página do carrinho
And o produto adicionado deve ser apresentado no carrinho

Scenario: Remover um produto do carrinho
Given que estou no carrinho
And existe um produto adicionado
When clico no botão "Remove" do produto
Then o produto deve ser removido do carrinho

Scenario: Continuar comprando a partir do carrinho
Given que estou no carrinho
When clico no botão "Continue Shopping"
Then devo retornar para a página de produtos

Scenario: Acessar o checkout pelo carrinho
Given que estou no carrinho
And existe um produto adicionado
When clico no botão "Checkout"
Then devo acessar a tela de informações de checkout
And devo visualizar os campos "First Name", "Last Name" e "Zip Code"
And devo visualizar o botão "Continue"

# Checkout

Scenario: Checkout sem preencher os campos obrigatórios
Given que estou na tela de informações de checkout
When clico no botão "Continue" sem preencher os campos
Then devo visualizar a mensagem "Error: First Name is required"

Scenario: Checkout preenchendo somente o primeiro nome
Given que estou na tela de informações de checkout
When informo o primeiro nome
And clico no botão "Continue"
Then devo visualizar a mensagem "Error: Last Name is required"

Scenario: Checkout preenchendo nome e sobrenome sem CEP
Given que estou na tela de informações de checkout
When informo o primeiro nome
And informo o sobrenome
And clico no botão "Continue"
Then devo visualizar a mensagem "Error: Postal Code is required"

Scenario: Avançar para a revisão do pedido
Given que estou na tela de informações de checkout
When informo o primeiro nome
And informo o sobrenome
And informo o código postal
And clico no botão "Continue"
Then devo acessar a tela de revisão do pedido
And devo visualizar o produto adicionado
And devo visualizar o valor do produto

Scenario: Validar o cálculo do valor do pedido
Given que estou na tela de revisão do pedido
And existe um produto no pedido
Then o valor do produto deve ser apresentado corretamente
And o subtotal deve ser apresentado
And os impostos devem ser apresentados
And o valor total deve corresponder à soma dos valores apresentados

Scenario: Cancelar o checkout na tela de revisão
Given que estou na tela de revisão do pedido
When clico no botão "Cancel"
Then devo retornar para a página do carrinho

# Finalização

Scenario: Finalizar um pedido com sucesso
Given que estou na tela de revisão do pedido
When clico no botão "Finish"
Then devo visualizar a mensagem "Thank you for your order!"
And devo visualizar a mensagem "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
And devo visualizar o botão "Back Home"

Scenario: Voltar para a página inicial após finalizar o pedido
Given que o pedido foi finalizado com sucesso
When clico no botão "Back Home"
Then devo retornar para a página de produtos

# Comportamento observado

Scenario: Validar o comportamento do carrinho após cancelar o checkout
Given que estou na tela de revisão do pedido
And existe um produto no pedido
When clico no botão "Cancel"
Then devo retornar para a página do carrinho
And devo verificar o estado do carrinho
And o produto deve permanecer no carrinho
And o comportamento do carrinho deve estar de acordo com o fluxo esperado

### Detalhes do produto


Scenario: Acessar os detalhes de um produto
  When eu acesso os detalhes do produto "Sauce Labs Backpack"
  Then devo visualizar a página de detalhes do produto
  And devo visualizar o produto "Sauce Labs Backpack"

Scenario: Adicionar produto ao carrinho pela tela de detalhes
  When eu acesso os detalhes do produto "Sauce Labs Backpack"
  And adiciono o produto ao carrinho pela tela de detalhes
  Then o contador do carrinho deve exibir "1"
  And o botão de remover deve estar disponível

Scenario: Remover produto pela tela de detalhes
  When eu acesso os detalhes do produto "Sauce Labs Backpack"
  And adiciono o produto ao carrinho pela tela de detalhes
  And removo o produto pela tela de detalhes
  Then o contador do carrinho não deve estar visível
  And o botão "Add to cart" deve estar disponível

Scenario: Retornar para produtos pela tela de detalhes
  When eu acesso os detalhes do produto "Sauce Labs Backpack"
  And retorno para a lista de produtos
  Then devo visualizar a página de produtos
  And devo visualizar o produto "Sauce Labs Backpack"

