import { test } from './page-objects/PaginaLogin';

test.describe('Página de Login', () => {
  test('Deve conseguir fazer login com email e senha válidos', async ({ paginaLogin }) => {
    
    await paginaLogin.clickLogin();
    await paginaLogin.exibirLoginForm();
    await paginaLogin.fazerLogin('teste@teste.com', '1111');
    await paginaLogin.loginFeitoComSucesso('/home');
  });

  test('Não deve conseguir fazer login com email inválido e senha válida', async ({ paginaLogin }) => {

    await paginaLogin.clickLogin();
    await paginaLogin.exibirLoginForm();
    await paginaLogin.fazerLogin('teste.erro@teste.com', '1111');
    await paginaLogin.mensagemLoginInvalido('Você não está autorizado a acessar este recurso');
  });

  test('Não deve conseguir fazer login com campos de email e senha vazios', async ({ paginaLogin }) => {

    const campoObritatorio = ['E-mail é obrigatório', 'Senha é obrigatória'];

    await paginaLogin.clickLogin();
    await paginaLogin.exibirLoginForm();
    await paginaLogin.fazerLogin();

    for (const mensagem of campoObritatorio) {
      await paginaLogin.mensagemCampoObrigatorio(mensagem);
    }
  });

  test('Não deve conseguir fazer login com formato de email inválido', async ({ paginaLogin }) => {

    await paginaLogin.clickLogin();
    await paginaLogin.exibirLoginForm();
    await paginaLogin.fazerLogin('email_invalido');

    await paginaLogin.mensagemCampoObrigatorio('E-mail inválido');
  });

  test('Não deve conseguir fazer login após interceptar os dados', async ({ paginaLogin, page }) => {

    const usuario = {
      email: 'teste@teste.com',
      senha: '1111',
    };

    await page.route('**/auth/login', router => router.fulfill({
      status: 401,
      body: JSON.stringify(usuario)
    }));

    await paginaLogin.clickLogin();
    await paginaLogin.exibirLoginForm();
    await paginaLogin.fazerLogin(usuario.email, usuario.senha);
  
    await paginaLogin.mensagemLoginInvalido('Você não está autorizado a acessar este recurso');
  });
});