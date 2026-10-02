import { Page, Locator } from "@playwright/test";

export class MenuPage {
  readonly page: Page;

  readonly menuButton: Locator;
  readonly allItems: Locator;
  readonly about: Locator;
  readonly logout: Locator;
  readonly resetAppState: Locator;

  constructor(page: Page) {
    this.page = page;

    this.menuButton = page.getByRole("button", {
      name: "Open Menu",
    });

    this.allItems = page.getByTestId("inventory-sidebar-link");

    this.about = page.getByTestId("about-sidebar-link");

    this.logout = page.getByTestId("logout-sidebar-link");

    this.resetAppState = page.getByTestId("reset-sidebar-link");
  }

  async abrirMenu() {
    await this.menuButton.click();
  }

  async acessarAllItems() {
    await this.allItems.click();
  }

  async acessarAbout() {
    await this.about.click();
  }

  async fazerLogout() {
    await this.logout.click();
  }

  async resetarAppState() {
    await this.resetAppState.click();
  }
}
