import { Usuario } from './Usuario.model';

export class CampanhaDTO {
  public dataCriacao: string;
  public sqCampanha: number;
  public tituloCampanha: string;
  public imagemCampanha: string;
  public descricaoCampanha: string;
  public usuario: Usuario;
  constructor(
    dataCriacao: string,
    sqCampanha: number,
    tituloCampanha: string,
    imagemCampanha: string,
    descricaoCampanha: string,
    usuario: Usuario
  ) {
    this.dataCriacao = dataCriacao;
    this.sqCampanha = sqCampanha;
    this.tituloCampanha = tituloCampanha;
    this.imagemCampanha = imagemCampanha;
    this.descricaoCampanha = descricaoCampanha;
    this.usuario = usuario;
  }
}
