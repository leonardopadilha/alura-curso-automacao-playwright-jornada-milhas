import { test } from '@playwright/test';
import PaginaLogin from './page-objects/PaginaLogin';

let paginaLogin: PaginaLogin;

test.beforeEach(({ page }) => {
  paginaLogin = new PaginaLogin(page);
});

test.describe('Página de Login', () => {
  test('Deve conseguir fazer login com email e senha válidos', async ({ page }) => {
    
    await paginaLogin.visitar('/');
    await paginaLogin.clickLogin();
    await paginaLogin.exibirLoginForm();
    await paginaLogin.fazerLogin('teste@teste.com', '1111');
    await paginaLogin.loginFeitoComSucesso('/home');
  });
});