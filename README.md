# 🧪 QA Automation — Playwright + TypeScript

<p align="center">
  <img src="https://playwright.dev/img/playwright-logo.svg" width="110" alt="Playwright">
</p>

<h2 align="center">Automação de Testes Web</h2>

<p align="center">
  Projeto desenvolvido para prática e demonstração de <strong>Quality Assurance</strong>,
  utilizando Playwright e TypeScript na validação funcional da aplicação SauceDemo.
</p>

<p align="center">

![Playwright](https://img.shields.io/badge/Playwright-1.55.0-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Required-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Chromium](https://img.shields.io/badge/Browser-Chromium-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)

</p>

---

## 📌 Sobre o projeto

Este projeto contém uma suíte de **testes automatizados web** utilizando **Playwright + TypeScript**.

A aplicação utilizada para os testes é o **SauceDemo**, com foco inicial nos fluxos de login e carrinho de compras.

O projeto também foi configurado para gerar **evidências de execução**, como screenshots, vídeos e relatório HTML, facilitando a análise dos resultados e das possíveis falhas.

---

## 🎯 Objetivos

- Validar cenários positivos e negativos.
- Automatizar fluxos funcionais da aplicação.
- Utilizar seletores confiáveis.
- Validar resultados esperados com assertions.
- Gerar evidências de execução.
- Disponibilizar relatório HTML para análise.
- Manter uma estrutura simples e organizada para evolução da suíte.

---

# 🧰 Tecnologias utilizadas

| Tecnologia     | Utilização                      |
| -------------- | ------------------------------- |
| **Playwright** | Automação e execução dos testes |
| **TypeScript** | Linguagem dos testes            |
| **Node.js**    | Ambiente de execução            |
| **npm**        | Gerenciamento de dependências   |
| **Chromium**   | Navegador utilizado nos testes  |

---

# 📂 Estrutura do projeto

```text
afya_qa_junior/
│
├── 📁 api/
│
├── 📁 automation/
│   │
│   ├── 📁 tests/
│   │   ├── login-invalid.spec.ts
│   │   └── login-cart.spec.ts
│   │
│   ├── 📁 playwright-report/
│   ├── 📁 test-results/
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── playwright.config.ts
│
├── 📁 evidence/
│
├── 📁 manual/
│
└── 📄 README.md
```

---

# 🌐 Aplicação testada

**SauceDemo**

https://www.saucedemo.com/

---

# 🧪 Cenários automatizados

## 🔐 Login com senha inválida

**Arquivo:**

```text
automation/tests/login-invalid.spec.ts
```

### Cenário

```text
Acessar aplicação
       ↓
Informar usuário válido
       ↓
Informar senha inválida
       ↓
Clicar em Login
       ↓
Validar mensagem de erro
       ↓
Validar permanência na tela de login
```

### Validações

- Usuário preenchido corretamente.
- Senha inválida informada.
- Mensagem de erro exibida.
- Usuário permanece na página de login.
- Página de produtos não é apresentada.

---

## 🛒 Login válido + inclusão de produto

**Arquivo:**

```text
automation/tests/login-cart.spec.ts
```

### Cenário

```text
Login
  ↓
Página de produtos
  ↓
Localizar Sauce Labs Backpack
  ↓
Adicionar ao carrinho
  ↓
Validar quantidade
  ↓
Abrir carrinho
  ↓
Validar produto
```

### Validações

- Login realizado com sucesso.
- Página de produtos carregada.
- Produto localizado.
- Produto adicionado ao carrinho.
- Quantidade de itens validada.
- Produto correto apresentado no carrinho.

---

# ⚙️ Configuração do Playwright

A aplicação é configurada como `baseURL`:

```typescript
baseURL: "https://www.saucedemo.com";
```

Como a aplicação utiliza o atributo `data-test`, o Playwright foi configurado para utilizá-lo como identificador:

```typescript
testIdAttribute: "data-test";
```

Assim, é possível utilizar:

```typescript
page.getByTestId("username");
```

para localizar:

```html
<input data-test="username" />
```

---

# 📸 Evidências de teste

Uma parte importante do projeto é a geração de **evidências**, permitindo comprovar visualmente o comportamento da aplicação durante a execução dos testes.

O Playwright foi configurado da seguinte forma:

```typescript
screenshot: 'only-on-failure',
video: 'retain-on-failure'
```

Isso significa que, quando um teste falha, podem ser disponibilizados arquivos como:

### 🖼️ Screenshot

O screenshot registra o estado visual da página no momento da falha.

Local:

```text
automation/test-results/
```

Exemplo:

```text
test-failed-1.png
```

Esse tipo de evidência ajuda a identificar rapidamente o estado da aplicação quando ocorreu o problema.

### 🎥 Vídeo

O Playwright
# afya-qa-junior-playwright
