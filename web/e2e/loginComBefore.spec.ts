import { test } from '@playwright/test';
import PaginaLogin from './page-objects/PaginaLogin_before';

let paginaLogin: PaginaLogin;

test.beforeEach(({ page }) => {
  paginaLogin = new PaginaLogin(page);
});

test.describe('Página de Login', () => {
  test('Deve conseguir fazer login com email e senha válidos', async () => {
    
    await paginaLogin.visitar();
    await paginaLogin.clickLogin();
    await paginaLogin.exibirLoginForm();
    await paginaLogin.fazerLogin('teste@teste.com', '1111');
    await paginaLogin.loginFeitoComSucesso('/home');
  });

  test('Não deve conseguir fazer login com email inválido e senha válida', async () => {

    await paginaLogin.visitar();
    await paginaLogin.clickLogin();
    await paginaLogin.exibirLoginForm();
    await paginaLogin.fazerLogin('teste.erro@teste.com', '1111');
    await paginaLogin.mensagemLoginInvalido('Você não está autorizado a acessar este recurso');
  });

  test('Não deve conseguir fazer login com campos de email e senha vazios', async () => {

    const campoObritatorio = ['E-mail é obrigatório', 'Senha é obrigatória'];

    await paginaLogin.visitar();
    await paginaLogin.clickLogin();
    await paginaLogin.exibirLoginForm();
    await paginaLogin.fazerLogin();

    for (const mensagem of campoObritatorio) {
      await paginaLogin.mensagemCampoObrigatorio(mensagem);
    }
  });

  test('Não deve conseguir fazer login com formato de email inválido', async () => {

    await paginaLogin.visitar();
    await paginaLogin.clickLogin();
    await paginaLogin.exibirLoginForm();
    await paginaLogin.fazerLogin('email_invalido');

    await paginaLogin.mensagemCampoObrigatorio('E-mail inválido');
  });

  test('Não deve conseguir fazer login após interceptar os dados', async ({ page }) => {

    const usuario = {
      email: 'teste@teste.com',
      senha: '1111',
    };

    await page.route('**/auth/login', router => router.fulfill({
      status: 401,
      body: JSON.stringify(usuario)
    }));

    await paginaLogin.visitar();
    await paginaLogin.clickLogin();
    await paginaLogin.exibirLoginForm();
    await paginaLogin.fazerLogin(usuario.email, usuario.senha);
  
    await paginaLogin.mensagemLoginInvalido('Você não está autorizado a acessar este recurso');
  });
});