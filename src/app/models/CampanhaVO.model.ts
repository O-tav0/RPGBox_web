export class CampanhaVO {
  public tituloCampanha: string;
  public imagemCampanha: string;
  public descricaoCampanha: string;
  public emailUsuarioLogado: string;

  constructor(
    tituloCampanha: string,
    imagemCampanha: string,
    descricaoCampanha: string,
    emailUsuarioLogado: string
  ) {
    this.tituloCampanha = tituloCampanha;
    this.imagemCampanha = imagemCampanha;
    this.descricaoCampanha = descricaoCampanha;
    this.emailUsuarioLogado = emailUsuarioLogado;
  }
}
