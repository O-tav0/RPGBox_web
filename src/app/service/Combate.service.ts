import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CombateDTO } from '../models/CombateDTO.model';
import { CombateVO } from '../models/CombateVO.model';
import { map } from 'rxjs/operators';
import { CombateLog } from '../models/CombateLog.model';
import { RespostaDTO } from '../models/RespostaDTO.model';
import { PersonagemDTO } from '../models/PersonagemDTO.model';
import { AtualizaCombateVO } from '../models/AtualizaCombateVO.model';

@Injectable({
    providedIn: 'root',
})
export class CombateService {
  
  
public cadastrarCombnate(novoCombate: CombateVO): Observable<any> {
    return this.http.post<any>(
    `http://localhost:8080/combates/novo`,
    novoCombate
    );
}

public buscarCombate(
    sqCombate: number
  ): Observable<CombateDTO> {
    return this.http
      .get<any>(`http://localhost:8080/combates/${sqCombate}`)
      .pipe(map((resposta: any) => resposta.objetoResposta));
  }

  public atualizarCombate(sqCombate: number, resumoCombate: CombateLog): Observable<any> {
    console.log(resumoCombate)
    return this.http.put<any>(
    `http://localhost:8080/combates/${sqCombate}/finalizar`,
    resumoCombate
    );
  }
  
  public deletarCombate(sqCombate: number): Observable<String> {
    return this.http.delete<any>(`http://localhost:8080/combates/${sqCombate}/deletar`).pipe(map((resposta: RespostaDTO) => resposta.mensagem))
  }

  public buscarPersonagensDoCombate(sqCombate: number): Observable<PersonagemDTO[]> {
    return this.http.get<any>(`http://localhost:8080/combates/${sqCombate}/personagens`).pipe(map((resposta: RespostaDTO) => resposta.objetoResposta))
  }

  public atualizarIntegrantesCombate(sqCombate: number, combateAtualizado: AtualizaCombateVO): Observable<any> {
    return this.http.put<any>(
    `http://localhost:8080/combates/${sqCombate}/atualizar`,
    combateAtualizado
    );
  }

  public buscarPersonagensDisponiveisCombate(sqCombate: number): Observable<PersonagemDTO[]> {
    return this.http.get<any>(`http://localhost:8080/combates/${sqCombate}/personagens-disponiveis`).pipe(map((resposta: RespostaDTO) => resposta.objetoResposta))
  }

    constructor(private http: HttpClient) {}
  }

