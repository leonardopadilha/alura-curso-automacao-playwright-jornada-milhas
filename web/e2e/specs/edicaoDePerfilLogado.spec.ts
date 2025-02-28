import { testeLogado } from "e2e/setup/testeLogado";

testeLogado.describe('Página de perfil', () => {
  testeLogado("Deve conseguir editar o perfil", async ({ paginaPerfil }) => {
    await paginaPerfil.visitar();
  });
});