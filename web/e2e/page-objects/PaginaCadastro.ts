import { Locator, Page, expect } from "@playwright/test";
import { Genero, Perfil } from 'e2e/operacoes/gerarPerfil';
import FormBaseCadastroEPerfil from "./FormBaseCadastroEPerfil";

export default class PaginaCadastro {
  private readonly page: Page;
  private readonly formBase: FormBaseCadastroEPerfil;
  private readonly botaoVisitarPaginaCadastro: Locator;
  private readonly checkboxTermos: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.formBase = new FormBaseCadastroEPerfil(page); // Composição

    this.botaoVisitarPaginaCadastro = page.getByTestId('header-botao-cadastre-se');
    
    this.checkboxTermos = page
      .getByTestId('form-base-checkbox-termos')
      .getByLabel('Li e aceito os termos e condições deste cadastro');
  }

  async visitar() {
    await this.page.goto('/');
    await this.botaoVisitarPaginaCadastro.click();
    await expect(this.page).toHaveURL('/auth/cadastro');
  }

  async confirmarTermos() {
    await this.checkboxTermos.check();
  }

  async cadastrarUsuario(usuario: Perfil) {
    await this.formBase.definirNome(usuario.nome);
    await this.formBase.definirDataNascimento(usuario.dataNascimento);
    await this.formBase.definirGenero(usuario.genero);
    await this.formBase.definirCPF(usuario.cpf);
    await this.formBase.definirTelefone(usuario.telefone);
    await this.formBase.definirCidade(usuario.cidade);
    await this.formBase.definirEstado(usuario.estado);

    await this.formBase.definirEmail(usuario.email);
    await this.formBase.confirmarEmail(usuario.email);
    await this.formBase.definirSenha(usuario.senha);
    await this.formBase.confirmarSenha(usuario.senha);
    await this.confirmarTermos();
    await this.formBase.submeterForm();
  }

  async cadastroFeitoComSucesso() {
    await expect(await this.page).toHaveURL('/auth/login');
  }

  async estaMostrandoMensagemDeErro(mensagem: string) {
    const elementoErro = this.page.getByText(mensagem);
    await expect(elementoErro).toBeVisible();
  }
}