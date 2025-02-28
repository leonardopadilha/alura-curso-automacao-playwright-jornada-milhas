import { testeLogado } from "e2e/setup/testeLogado";

testeLogado.describe('Página de perfil', () => {
  testeLogado("Editar perfil 1", async ({ paginaPrincipal }) => {
    await paginaPrincipal.visitar();
  });

  testeLogado("Editar perfil 2", async ({ paginaPrincipal }) => {
    await paginaPrincipal.visitar();
  });
});