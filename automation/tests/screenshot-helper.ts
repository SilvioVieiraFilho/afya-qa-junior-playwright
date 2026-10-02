import { Page } from "@playwright/test";
import path from "path";

export async function salvarEvidencia(page: Page, pasta: string, nome: string) {
  await page.screenshot({
    path: path.join("..", "evidence", pasta, `${nome}.png`),
    fullPage: true,
  });
}
