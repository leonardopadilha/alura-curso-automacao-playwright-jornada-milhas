import { Locator, Page, expect } from '@playwright/test';

export default class PaginaCadastro {
  private readonly page: Page;
  private readonly botaoVisitarPaginaCadastro: Locator;
  private readonly inputNome: Locator;
  private readonly inputDataNascimento: Locator;
  private readonly inputCpf: Locator;
  private readonly inputCidade: Locator;
  private readonly inputTelefone: Locator;
  private readonly inputEstado: Locator;
  private readonly inputEmail: Locator;
  private readonly inputSenha: Locator;
  private readonly inputConfirmarEmail: Locator;
  private readonly inputConfirmarSenha: Locator;
  private readonly botaoSubmeterForm: Locator;
  private readonly checkboxTermos: Locator;

  constructor(page: Page) {
    this.page = page;
    this.botaoVisitarPaginaCadastro = page.getByTestId('header-botao-cadastre-se');
    
    this.inputNome = page.getByTestId('form-base-input-nome');
    this.inputDataNascimento = page.getByTestId('form-base-input-data-nascimento');
    this.inputCpf = page.getByTestId('form-base-input-cpf');
    this.inputCidade = page.getByTestId('form-base-input-cidade');
    this.inputTelefone = page.getByTestId('form-base-input-telefone');
    
    this.inputEstado = page
        .getByTestId('form-base-container-estado')
        .getByLabel('Estado');
        
    this.inputEmail = page.getByTestId('form-base-input-email');
    this.inputSenha = page.getByTestId('form-base-input-senha');
    this.inputConfirmarEmail = page.getByTestId('form-base-input-confirmar-email');
    this.inputConfirmarSenha = page.getByTestId('form-base-input-confirmar-senha');
    
    this.botaoSubmeterForm = page.getByTestId('form-base-botao-submeter-form');
    this.checkboxTermos = page
        .getByTestId('form-base-checkbox-termos')
        .getByLabel('Li e aceito os termos e condições deste cadastro');
}

  async visitar() {
    await this.page.goto('/');
    await this.botaoVisitarPaginaCadastro.click();
    await expect(this.page).toHaveURL('/auth/cadastro');
  }

  async estaMostrandoMensagemDeErro(mensagem: string) {
    const elementoErro = this.page.getByText(mensagem);
    await expect(elementoErro).toBeVisible();
  }
}