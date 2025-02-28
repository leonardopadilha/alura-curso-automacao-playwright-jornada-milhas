import * as fs from 'fs';
import * as path from "path";
import { test } from "./fixtures";
import PaginaCadastro from 'e2e/page-objects/PaginaCadastro';
import PaginaLogin from 'e2e/page-objects/PaginaLogin';
import { gerarPerfil } from 'e2e/operacoes/gerarPerfil';
import { expect } from 'playwright/test';

export const testeLogado = test.extend<object, { arquivoInfoLogin: string }>({
  arquivoInfoLogin: [async({ browser }, use) => {
    const id = test.info().parallelIndex;
    const caminhoArquivo = path.resolve(test.info().project.outputDir, `.auth/usuario-${id}.json`);

    if (fs.existsSync(caminhoArquivo)) {
      await use(caminhoArquivo);
      return;
    }

    //console.log('Índice paralelo do worker', id);
    //console.log('Caminho do arquivo de login desse worker: ', caminhoArquivo);

    const page = await browser.newPage({ storageState: undefined });
    const paginaCadastro = new PaginaCadastro(page);
    const paginaLogin = new PaginaLogin(page);
    const novoUsuario = gerarPerfil();

    await page.goto('http://localhost:4200/auth/cadastro');
    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await expect(page).toHaveURL('http://localhost:4200/auth/login');

    await paginaLogin.fazerLogin(novoUsuario.email, novoUsuario.senha);
    await expect(page).toHaveURL('http://localhost:4200/home');

    await page.context().storageState({ path: caminhoArquivo });

    await use(caminhoArquivo);
    await page.close();

  }, { scope: "worker"}],
  storageState: ({ arquivoInfoLogin }, use) => use(arquivoInfoLogin)
});