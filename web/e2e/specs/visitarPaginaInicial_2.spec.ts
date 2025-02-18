import { test, expect } from "playwright/test";

test.describe("Página Inicial", () => {
  test("Deve visitar a página inicial", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Jornada Milhas");
    await expect(page.locator('[data-testid=titulo-passagens]')).toBeVisible();
    await expect(page.getByTestId('titulo-passagens')).toContainText("Passagens");
    await expect(page.getByTestId('titulo-promocoes')).toBeVisible();
    
    const promocoes = page.getByRole('heading', { name: 'Promoções'});
    await expect(promocoes).toBeVisible();
  });
});