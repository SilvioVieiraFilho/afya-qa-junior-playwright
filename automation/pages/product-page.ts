import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly page: Page;

  readonly backpackAddButton: Locator;
  readonly backpackRemoveButton: Locator;
  readonly shoppingCart: Locator;
  readonly cartBadge: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removeButton: Locator;
  readonly backToProductsButton: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly backHomeButton: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly errorMessage: Locator;

  // Filtros
  readonly productSort: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  // Detalhes do produto
  readonly productName: Locator;
  readonly detailAddButton: Locator;
  readonly detailRemoveButton: Locator;
  readonly detailBackToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Produtos
    this.backpackAddButton = page.getByTestId(
      "add-to-cart-sauce-labs-backpack",
    );

    this.backpackRemoveButton = page.getByTestId("remove-sauce-labs-backpack");

    // Carrinho
    this.shoppingCart = page.getByTestId("shopping-cart-link");

    this.cartBadge = page.getByTestId("shopping-cart-badge");

    // Checkout
    this.checkoutButton = page.getByTestId("checkout");

    this.continueShoppingButton = page.getByTestId("continue-shopping");

    this.removeButton = page.getByRole("button", {
      name: "Remove",
    });

    this.backToProductsButton = page.getByTestId("back-to-products");

    this.continueButton = page.getByTestId("continue");

    this.cancelButton = page.getByTestId("cancel");

    this.finishButton = page.getByTestId("finish");

    this.backHomeButton = page.getByTestId("back-to-products");

    // Campos do checkout
    this.firstNameInput = page.getByTestId("firstName");

    this.lastNameInput = page.getByTestId("lastName");

    this.postalCodeInput = page.getByTestId("postalCode");

    this.errorMessage = page.getByTestId("error");

    // Filtros
    this.productSort = page.getByTestId("product-sort-container");

    this.productNames = page.locator(".inventory_item_name");

    this.productPrices = page.locator(".inventory_item_price");

    // Detalhes do produto
    this.productName = page.getByTestId("inventory-item-name");

    this.detailAddButton = page.getByTestId("add-to-cart");

    this.detailRemoveButton = page.getByTestId("remove");

    this.detailBackToProductsButton = page.getByTestId("back-to-products");
  }

  // ==============================
  // PRODUTOS
  // ==============================

  async adicionarMochila() {
    await this.backpackAddButton.click();
  }

  async removerMochila() {
    await this.backpackRemoveButton.click();
  }

  // ==============================
  // CARRINHO
  // ==============================

  async acessarCarrinho() {
    await this.shoppingCart.click();
  }

  async continuarComprando() {
    await this.continueShoppingButton.click();
  }

  async removerProduto() {
    await this.removeButton.first().click();
  }

  // ==============================
  // DETALHES DO PRODUTO
  // ==============================

  async acessarDetalhesDoProduto(nome: string) {
    await this.page
      .getByTestId("inventory-item-name")
      .filter({ hasText: nome })
      .click();
  }

  async adicionarProdutoPelosDetalhes() {
    await this.detailAddButton.click();
  }

  async removerProdutoPelosDetalhes() {
    await this.detailRemoveButton.click();
  }

  async voltarParaProdutosPelosDetalhes() {
    await this.detailBackToProductsButton.click();
  }

  // ==============================
  // CHECKOUT
  // ==============================

  async acessarCheckout() {
    await this.checkoutButton.click();
  }

  async preencherCheckout(
    primeiroNome: string,
    sobrenome: string,
    codigoPostal: string,
  ) {
    await this.firstNameInput.fill(primeiroNome);
    await this.lastNameInput.fill(sobrenome);
    await this.postalCodeInput.fill(codigoPostal);
  }

  async clicarContinue() {
    await this.continueButton.click();
  }

  async clicarCancel() {
    await this.cancelButton.click();
  }

  async clicarFinish() {
    await this.finishButton.click();
  }

  async voltarParaHome() {
    await this.backHomeButton.click();
  }

  // ==============================
  // FILTROS
  // ==============================

  async selecionarFiltro(opcao: string) {
    await this.productSort.selectOption(opcao);
  }
}
