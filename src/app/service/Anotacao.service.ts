import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario.model';
import { RespostaDTO } from '../models/RespostaDTO.model';

import { map } from 'rxjs/operators';
import { CampanhaDTO } from '../models/CampanhaDTO.model';
import { CampanhaVO } from '../models/CampanhaVO.model';
import { PersonagemCampanhaDTO } from '../models/PersonagemCampanhaDTO.model';
import { PersonagemDTO } from '../models/PersonagemDTO.model';
import { CombateDTO } from '../models/CombateDTO.model';
import { AnotacaoVO } from '../models/AnotacaoVO.model';

@Injectable({
  providedIn: 'root',
})
export class AnotacaoService {

  public cadastrarAnotacao(novaAnotacao: AnotacaoVO): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/anotacao/novo`,
      novaAnotacao
    );
  }

  public deletarAnotacao(sqAnotacao: number): Observable<String> {
    return this.http.delete<any>(`http://localhost:8080/anotacao/${sqAnotacao}/deletar`).pipe(map((resposta: RespostaDTO) => resposta.mensagem))
  }

  public atualizarAnotacao(sqAnotacao: number, anotacaoAtualizada: AnotacaoVO): Observable<any> {
    
    return this.http.put<any>(
    `http://localhost:8080/anotacao/${sqAnotacao}/alterar`,
    anotacaoAtualizada
    );
  }

  constructor(private http: HttpClient) {}
}
