import { Usuario } from './Usuario.model';

export class RespostaDTO {
  public mensagem: string;
  public objetoResposta: any;

  constructor(mensagem: string, objetoResposta: any) {
    this.mensagem = mensagem;
    this.objetoResposta = objetoResposta;
  }
}
