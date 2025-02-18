import test, { expect } from "@playwright/test";

test.describe("Página Inicial", () => {
  test("Deve visitar a página inicial", async ({ page }) => {
    await page.goto("/");  // ação
    await expect(page).toHaveTitle("Jornada Milhas");  // asserção

    // const tituloPassagens = page.getByRole('heading', { name: 'Passagens' });
    // await expect(tituloPassagens).toBeVisible();

    const tituloPassagens = page.getByTestId('titulo-passagens');
    await expect(tituloPassagens).toBeVisible();
  });
});
