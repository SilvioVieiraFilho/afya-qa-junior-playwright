import { test, expect } from "@playwright/test";

import { LoginPage } from "../pages/login-page";
import { ProductPage } from "../pages/product-page";
import { MenuPage } from "../pages/menu-page";
import { salvarEvidencia } from "./screenshot-helper";

const USUARIO_VALIDO = "standard_user";
const SENHA_VALIDA = "secret_sauce";

test.describe("Produtos - SauceDemo", () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let menuPage: MenuPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    menuPage = new MenuPage(page);

    await loginPage.acessar();

    await loginPage.preencherUsuario(USUARIO_VALIDO);
    await loginPage.preencherSenha(SENHA_VALIDA);
    await loginPage.clicarLogin();

    await expect(page).toHaveURL(/inventory.html/);
  });

  // ==============================
  // PRODUTOS
  // ==============================

  test("Visualizar produtos após realizar login", async ({ page }) => {
    await expect(page.locator(".title")).toHaveText("Products");

    await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();

    await expect(productPage.backpackAddButton).toBeVisible();

    await salvarEvidencia(page, "products", "produtos");
  });

  test("Adicionar produto ao carrinho", async () => {
    await productPage.adicionarMochila();

    await expect(productPage.cartBadge).toHaveText("1");

    await expect(productPage.backpackRemoveButton).toBeVisible();

    await salvarEvidencia(productPage.page, "products", "produto-carrinho");
  });

  test("Remover produto da página de produtos", async () => {
    await productPage.adicionarMochila();

    await expect(productPage.cartBadge).toHaveText("1");

    await productPage.removerMochila();

    await expect(productPage.backpackAddButton).toBeVisible();

    await expect(productPage.cartBadge).not.toBeVisible();
  });

  // ==============================
  // FILTROS
  // ==============================

  test("Validar filtro padrão por nome A a Z", async () => {
    await expect(productPage.productSort).toHaveValue("az");

    await expect(productPage.productNames.nth(0)).toHaveText(
      "Sauce Labs Backpack",
    );
  });

  test("Ordenar produtos por nome de Z a A", async () => {
    await productPage.selecionarFiltro("za");

    await expect(productPage.productSort).toHaveValue("za");

    await expect(productPage.productNames.nth(0)).toHaveText(
      "Test.allTheThings() T-Shirt (Red)",
    );
  });

  test("Ordenar produtos por preço do menor para o maior", async () => {
    await productPage.selecionarFiltro("lohi");

    await expect(productPage.productSort).toHaveValue("lohi");

    await expect(productPage.productPrices.nth(0)).toHaveText("$7.99");
  });

  test("Ordenar produtos por preço do maior para o menor", async () => {
    await productPage.selecionarFiltro("hilo");

    await expect(productPage.productSort).toHaveValue("hilo");

    await expect(productPage.productPrices.nth(0)).toHaveText("$49.99");

    await salvarEvidencia(productPage.page, "products", "filtros");
  });

  test("Manter produto selecionado ao alterar o filtro", async () => {
    await productPage.adicionarMochila();

    await expect(productPage.cartBadge).toHaveText("1");

    await expect(productPage.backpackRemoveButton).toBeVisible();

    await productPage.selecionarFiltro("lohi");

    await expect(productPage.productSort).toHaveValue("lohi");

    await expect(productPage.cartBadge).toHaveText("1");

    await expect(
      productPage.page.getByTestId("remove-sauce-labs-backpack"),
    ).toBeVisible();
  });

  test("Manter dois produtos selecionados ao alterar o filtro", async () => {
    await productPage.adicionarMochila();

    await productPage.page
      .getByTestId("add-to-cart-sauce-labs-bike-light")
      .click();

    await expect(productPage.cartBadge).toHaveText("2");

    await productPage.selecionarFiltro("hilo");

    await expect(productPage.productSort).toHaveValue("hilo");

    await expect(productPage.cartBadge).toHaveText("2");

    await expect(
      productPage.page.getByTestId("remove-sauce-labs-backpack"),
    ).toBeVisible();

    await expect(
      productPage.page.getByTestId("remove-sauce-labs-bike-light"),
    ).toBeVisible();
  });

  // ==============================
  // DETALHES DO PRODUTO
  // ==============================

  test("Acessar os detalhes de um produto", async ({ page }) => {
    await productPage.acessarDetalhesDoProduto("Sauce Labs Backpack");

    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);

    await expect(productPage.productName).toHaveText("Sauce Labs Backpack");

    await salvarEvidencia(page, "products", "detalhes-produto");
  });

  test("Adicionar produto ao carrinho pela tela de detalhes", async () => {
    await productPage.acessarDetalhesDoProduto("Sauce Labs Backpack");

    await productPage.adicionarProdutoPelosDetalhes();

    await expect(productPage.cartBadge).toHaveText("1");

    await expect(productPage.detailRemoveButton).toBeVisible();
  });

  test("Remover produto pela tela de detalhes", async () => {
    await productPage.acessarDetalhesDoProduto("Sauce Labs Backpack");

    await productPage.adicionarProdutoPelosDetalhes();

    await expect(productPage.cartBadge).toHaveText("1");

    await productPage.removerProdutoPelosDetalhes();

    await expect(productPage.cartBadge).not.toBeVisible();

    await expect(productPage.detailAddButton).toBeVisible();
  });

  test("Retornar para produtos pela tela de detalhes", async ({ page }) => {
    await productPage.acessarDetalhesDoProduto("Sauce Labs Backpack");

    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);

    await productPage.voltarParaProdutosPelosDetalhes();

    await expect(page).toHaveURL(/inventory\.html/);

    await expect(
      page.getByTestId("inventory-item-name").filter({
        hasText: "Sauce Labs Backpack",
      }),
    ).toBeVisible();
  });

  // ==============================
  // CARRINHO
  // ==============================

  test("Acessar carrinho com produto adicionado", async ({ page }) => {
    await productPage.adicionarMochila();

    await productPage.acessarCarrinho();

    await expect(page).toHaveURL(/cart.html/);

    await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();

    await salvarEvidencia(page, "products", "carrinho");
  });

  test("Acessar checkout pelo carrinho", async ({ page }) => {
    await productPage.adicionarMochila();

    await productPage.acessarCarrinho();

    await productPage.acessarCheckout();

    await expect(page).toHaveURL(/checkout-step-one.html/);

    await expect(productPage.firstNameInput).toBeVisible();

    await expect(productPage.lastNameInput).toBeVisible();

    await expect(productPage.postalCodeInput).toBeVisible();
  });

  test("Validar campos obrigatórios do checkout", async () => {
    await productPage.adicionarMochila();

    await productPage.acessarCarrinho();

    await productPage.acessarCheckout();

    await productPage.clicarContinue();

    await expect(productPage.errorMessage).toHaveText(
      "Error: First Name is required",
    );
  });

  test("Validar obrigatoriedade do sobrenome", async () => {
    await productPage.adicionarMochila();

    await productPage.acessarCarrinho();

    await productPage.acessarCheckout();

    await productPage.firstNameInput.fill("Silvio");

    await productPage.clicarContinue();

    await expect(productPage.errorMessage).toHaveText(
      "Error: Last Name is required",
    );
  });

  test("Avançar para revisão do pedido", async ({ page }) => {
    await productPage.adicionarMochila();

    await productPage.acessarCarrinho();

    await productPage.acessarCheckout();

    await productPage.preencherCheckout("Silvio", "Rodrigues", "09900-000");

    await productPage.clicarContinue();

    await expect(page).toHaveURL(/checkout-step-two.html/);

    await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();

    await salvarEvidencia(page, "products", "checkout");
  });

  test("Finalizar pedido com sucesso", async ({ page }) => {
    await productPage.adicionarMochila();

    await productPage.acessarCarrinho();

    await productPage.acessarCheckout();

    await productPage.preencherCheckout("Silvio", "Rodrigues", "09900-000");

    await productPage.clicarContinue();

    await expect(page).toHaveURL(/checkout-step-two.html/);

    await productPage.clicarFinish();

    await expect(page).toHaveURL(/checkout-complete.html/);

    await expect(page.getByText("Thank you for your order!")).toBeVisible();

    await expect(page.getByTestId("back-to-products")).toHaveText("Back Home");

    await salvarEvidencia(page, "products", "pedido-finalizado");
  });

  // ==============================
  // MENU HAMBÚRGUER
  // ==============================

  test("Abrir menu hambúrguer", async () => {
    await menuPage.abrirMenu();

    await expect(menuPage.allItems).toBeVisible();

    await expect(menuPage.about).toBeVisible();

    await expect(menuPage.logout).toBeVisible();

    await expect(menuPage.resetAppState).toBeVisible();
  });

  test("Acessar All Items pelo menu", async ({ page }) => {
    await menuPage.abrirMenu();

    await menuPage.acessarAllItems();

    await expect(page).toHaveURL(/inventory.html/);

    await expect(page.locator(".title")).toHaveText("Products");
  });

  test("Acessar About pelo menu", async ({ page }) => {
    await menuPage.abrirMenu();

    await menuPage.acessarAbout();

    await expect(page).toHaveURL("https://saucelabs.com/");
  });

  test("Realizar logout pelo menu", async ({ page }) => {
    await menuPage.abrirMenu();

    await menuPage.fazerLogout();

    await expect(page).toHaveURL("https://www.saucedemo.com/");

    await expect(page.getByTestId("login-button")).toBeVisible();
  });

  test("Resetar estado da aplicação pelo menu", async () => {
    await productPage.adicionarMochila();

    await expect(productPage.cartBadge).toHaveText("1");

    await menuPage.abrirMenu();

    await menuPage.resetarAppState();

    await expect(productPage.cartBadge).not.toBeVisible();
  });
});
