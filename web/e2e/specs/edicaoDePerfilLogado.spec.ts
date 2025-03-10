import { gerarPerfil } from "e2e/operacoes/gerarPerfil";
import { testeLogado } from "e2e/setup/testeLogado";

testeLogado.describe('Página de perfil', () => {
  testeLogado("Deve conseguir editar o perfil", async ({ paginaPerfil }) => {
    await paginaPerfil.visitar();

    const novosDadosUsuario = gerarPerfil();
    const emailAtual = await paginaPerfil.formBase.obterValorInputEmail();

    await paginaPerfil.atualizarUsuario({ ...novosDadosUsuario, email: emailAtual });
    await paginaPerfil.atualizadoComSucesso();

    await paginaPerfil.visitar();
    await paginaPerfil.dadosEstaoCorretos({ ...novosDadosUsuario, email: emailAtual });
  });

  testeLogado('Deve conseguir fazer logout', async ({ paginaPerfil }) => {
    await paginaPerfil.visitar();
    await paginaPerfil.deslogar();
    await paginaPerfil.deslogadoComSucesso();
  });
});