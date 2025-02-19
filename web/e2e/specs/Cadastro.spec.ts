import { test } from '../setup/fixtures';

test.describe('Página de cadastro', () => {
  test("Deve realizar cadastro com sucesso", async ({ paginaCadastro }) => {
    await paginaCadastro.visitar();
  });
});