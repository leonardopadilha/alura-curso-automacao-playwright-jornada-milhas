import { Locator, Page, expect } from '@playwright/test';
import { test as base } from '@playwright/test';

export const test = base.extend<{ paginaLogin: PaginaLogin }>({
  paginaLogin: async ({ page }, use) => {
    const paginaLogin = new PaginaLogin(page);
    await use(paginaLogin);
  }
});

export default class PaginaLogin {
  private readonly page: Page;
  private readonly botaoLogin: Locator;
  private readonly loginForm: Locator;
  private readonly inputEmail: Locator;
  private readonly inputSenha: Locator;
  private readonly botaoAcessarConta: Locator;
  private readonly iconePessoaUsuaria: Locator;
  private readonly mensagemLoginComErro: Locator;
  private readonly campoObrigatorio: Locator;

  constructor(page: Page) {
    this.page = page;
    this.botaoLogin = page.getByTestId('botao-login');
    this.loginForm = page.locator('[class$="header"] [class$="title"]');
    this.inputEmail = page.getByTestId('input-email');
    this.inputSenha = page.getByTestId('input-senha');
    this.botaoAcessarConta = page.getByTestId('botao-acessar-conta');
    this.iconePessoaUsuaria = page.locator('[src$="user.png"]');
    this.mensagemLoginComErro = page.locator('[class$="snackbar__label"]');
    this.campoObrigatorio = page.locator('[aria-live="polite"]');
  }

  async visitar() {
    await this.page.goto('/');
  }

  async clickLogin() {
    await this.botaoLogin.click();
  }

  async exibirLoginForm() {
    await expect(this.page).toHaveURL('/auth/login');
    await expect(this.loginForm).toBeVisible();
  }

  async fazerLogin(email = "", senha = "") {
    if (email) {
      await this.inputEmail.fill(email);
    } else {
      await this.inputEmail.click();
      await this.inputEmail.press('Tab');
    }

    if (senha) {
      await this.inputSenha.fill(senha);
      await this.botaoAcessarConta.click();
    } else {
      await this.inputSenha.click();
      await this.inputSenha.press('Tab');
    }
  }

  async loginFeitoComSucesso(endereco: string) {
    await expect(this.page).toHaveURL(endereco);
    await expect(this.iconePessoaUsuaria).toBeVisible();
    await expect(this.botaoLogin).not.toBeVisible();
  }

  async mensagemLoginInvalido(mensagem: string) {
    await expect(this.mensagemLoginComErro).toBeVisible();
    await expect(this.mensagemLoginComErro).toContainText(mensagem);
  }

  async mensagemCampoObrigatorio(mensagem: string) {
    await expect(this.campoObrigatorio).toContainText([mensagem]);
  }
}