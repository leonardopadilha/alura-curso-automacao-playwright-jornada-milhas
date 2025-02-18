import { test as base } from "@playwright/test";
import PaginaLogin from "e2e/page-objects/PaginaLogin";
import PaginaPrincipal from "e2e/page-objects/PaginaPrincipal";

export const test = base.extend<{ 
  paginaLogin: PaginaLogin,
  paginaPrincipal: PaginaPrincipal
}>({

  paginaLogin: async ({ page }, use) => {
    const paginaLogin = new PaginaLogin(page);
    await paginaLogin.visitar();
    await use(paginaLogin);
  },
  paginaPrincipal: async ({ page }, use) => {
    const paginaPrincipal = new PaginaPrincipal(page);
    await paginaPrincipal.visitar();
    await use(paginaPrincipal);
  }
});