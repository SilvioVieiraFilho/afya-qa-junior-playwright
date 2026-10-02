import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

const USUARIO_VALIDO = "standard_user";
const SENHA_VALIDA = "secret_sauce";

test.describe("Login - SauceDemo", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.acessar();
  });

  test("Login com credenciais válidas", async ({ page }) => {
    await loginPage.preencherUsuario(USUARIO_VALIDO);
    await loginPage.preencherSenha(SENHA_VALIDA);
    await loginPage.clicarLogin();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator(".title")).toHaveText("Products");

    await page.screenshot({
      path: "../evidence/login/login-valido.png",
      fullPage: true,
    });
  });

  test("Login sem preencher os campos obrigatórios", async ({ page }) => {
    await loginPage.clicarLogin();

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username is required",
    );

    await expect(page).toHaveURL("https://www.saucedemo.com/");

    await page.screenshot({
      path: "../evidence/login/login-sem-campos.png",
      fullPage: true,
    });
  });

  test("Login com senha vazia", async ({ page }) => {
    await loginPage.preencherUsuario(USUARIO_VALIDO);
    await loginPage.clicarLogin();

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Password is required",
    );

    await expect(page).toHaveURL("https://www.saucedemo.com/");

    await page.screenshot({
      path: "../evidence/login/login-senha-vazia.png",
      fullPage: true,
    });
  });

  test("Login com usuário vazio", async ({ page }) => {
    await loginPage.preencherSenha(SENHA_VALIDA);
    await loginPage.clicarLogin();

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username is required",
    );

    await expect(page).toHaveURL("https://www.saucedemo.com/");

    await page.screenshot({
      path: "../evidence/login/login-usuario-vazio.png",
      fullPage: true,
    });
  });

  test("Login com credenciais inválidas", async ({ page }) => {
    await loginPage.preencherUsuario("usuario_invalido");
    await loginPage.preencherSenha("senha_invalida");
    await loginPage.clicarLogin();

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );

    await expect(page).toHaveURL("https://www.saucedemo.com/");

    await page.screenshot({
      path: "../evidence/login/login-credenciais-invalidas.png",
      fullPage: true,
    });
  });
});
