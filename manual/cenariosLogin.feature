# Cenários manuais em Gherkin
# Estes cenários são documentação e não são executados pelo Playwright.

Feature: Login e recuperação de senha

  Scenario: Login com credenciais válidas
    Given que estou na tela de login
    And tenho um e-mail e uma senha válidos
    When informo as credenciais
    And clico em "Entrar"
    Then devo acessar a plataforma

  Scenario: Login sem preencher os campos obrigatórios
    Given que estou na tela de login
    When clico em "Entrar" sem preencher os campos
    Then o sistema deve informar que os dados obrigatórios precisam ser preenchidos
    And não devo acessar a plataforma

  Scenario: Login com senha vazia
    Given que estou na tela de login
    And informei um e-mail válido
    When clico em "Entrar" sem informar a senha
    Then o sistema deve informar que a senha é obrigatória
    And não devo acessar a plataforma

  Scenario: Login com e-mail vazio
    Given que estou na tela de login
    And informei uma senha
    When clico em "Entrar" sem informar o e-mail
    Then o sistema deve informar que o e-mail é obrigatório
    And não devo acessar a plataforma

  Scenario: Login com credenciais inválidas
    Given que estou na tela de login
    When informo credenciais inválidas
    And clico em "Entrar"
    Then o sistema deve informar que os dados estão incorretos
    And não deve informar qual campo está errado
    And não devo acessar a plataforma

  Scenario: Acessar recuperação de senha
    Given que estou na tela de login
    When clico em "Esqueci minha senha"
    Then devo ser direcionado para a recuperação de senha

  Scenario: Recuperação com e-mail válido cadastrado
    Given que estou na tela de recuperação de senha
    When informo um e-mail válido cadastrado
    And solicito a recuperação
    Then o sistema deve apresentar uma confirmação
    And não deve informar se o e-mail possui cadastro

  Scenario: Recuperação com e-mail válido não cadastrado
    Given que estou na tela de recuperação de senha
    When informo um e-mail válido não cadastrado
    And solicito a recuperação
    Then o sistema deve apresentar uma confirmação genérica
    And não deve informar que o e-mail não possui cadastro

  Scenario: Recuperação com e-mail inválido
    Given que estou na tela de recuperação de senha
    When informo um e-mail em formato inválido
    And solicito a recuperação
    Then o sistema deve informar que o e-mail é inválido
    And não deve concluir a solicitação

  Scenario: Recuperação sem informar e-mail
    Given que estou na tela de recuperação de senha
    When solicito a recuperação sem informar o e-mail
    Then o sistema deve informar que o e-mail é obrigatório
    And não deve concluir a solicitação

  Scenario: Cliques repetidos em Entrar durante o carregamento
    Given que estou na tela de login
    And informei as credenciais
    When clico rapidamente 3 vezes em "Entrar" durante o carregamento
    Then apenas uma requisição de login deve ser processada
