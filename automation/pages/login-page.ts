import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId("username");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-button");
    this.errorMessage = page.getByTestId("error");
  }

  async acessar() {
    await this.page.goto("/");
  }

  async preencherUsuario(usuario: string) {
    await this.usernameInput.fill(usuario);
  }

  async preencherSenha(senha: string) {
    await this.passwordInput.fill(senha);
  }

  async clicarLogin() {
    await this.loginButton.click();
  }
}
