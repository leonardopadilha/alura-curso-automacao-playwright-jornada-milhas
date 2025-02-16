import { test } from '@playwright/test';
import PaginaPrincipal from './page-objects/PaginaPrincipal';

let paginaPrincipal: PaginaPrincipal;

test.beforeEach(({ page }) => {
  paginaPrincipal = new PaginaPrincipal(page);
});

test.describe('Buscar Passagens', () => {
  test('Deve buscar passagens somente ida', async () => {
    const dataIda = new Date();

    await paginaPrincipal.visitar();
    await paginaPrincipal.definirSomenteIda();
    await paginaPrincipal.abrirModalPassageiros();
    await paginaPrincipal.definirPassageirosAdultos(3);
    await paginaPrincipal.definirPassageirosCriancas(1);
    await paginaPrincipal.definirPassageirosBebes(1);
    await paginaPrincipal.fecharModalPassageiros();

    await paginaPrincipal.definirOrigemEDestino("minas gerais", "rio de janeiro");
    await paginaPrincipal.definirData(dataIda);
    await paginaPrincipal.buscarPassagens();

    await paginaPrincipal.estaMostrandoPassagem('Somente ida', 'Minas Gerais', 'Rio de Janeiro', dataIda);
  });
});