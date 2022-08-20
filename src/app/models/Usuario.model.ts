export class Usuario {
  public sqUsuario: number;
  public nomeUsuario: string;
  public emailUsuario: string;
  public senhaUsuario: string;
  public caminhoImagem: string;

  constructor(
    sqUsuario: number,
    nomeUsuario: string,
    emailUsuario: string,
    senhaUsuario: string,
    caminhoImagem: string
  ) {
    this.sqUsuario = sqUsuario;
    this.nomeUsuario = nomeUsuario;
    this.senhaUsuario = senhaUsuario;
    this.emailUsuario = emailUsuario;
    this.caminhoImagem = caminhoImagem;
  }
}
