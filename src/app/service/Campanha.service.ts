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
import { AnotacaoDTO } from '../models/AnotacaoDTO.model';

@Injectable({
  providedIn: 'root',
})
export class CampanhaService {
  public buscarCampanhasPorEmailUsuario(
    email: string
  ): Observable<CampanhaDTO[]> {
    return this.http
      .get<any>(`http://localhost:8080/campanha/${email}`)
      .pipe(map((resposta: any) => resposta.objetoResposta));
  }

  public buscarCampanhaPorSqCampanha(
    sqCampanha: number
  ): Observable<CampanhaDTO> {
    return this.http
      .get<any>(
        `http://localhost:8080/campanha/informacoes-gerais/${sqCampanha}`
      )
      .pipe(map((resposta: any) => resposta.objetoResposta));
  }

  public cadastrarCampanha(novaCampanha: CampanhaVO): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/campanha/novo`,
      novaCampanha
    );
  }

  public buscarPersonagensCampanhaPorTipo(
    sqCampanha: number
  ): Observable<PersonagemCampanhaDTO> {
    return this.http
      .get<any>(
        `http://localhost:8080/campanha/${sqCampanha}/personagens-por-tipo`
      )
      .pipe(map((resposta: any) => resposta.objetoResposta));
  }

  public buscarTodosPersonagensCampanha(
    sqCampanha: number
  ): Observable<PersonagemDTO[]> {
    return this.http
      .get<any>(
        `http://localhost:8080/campanha/${sqCampanha}/personagens`
      )
      .pipe(map((resposta: any) => resposta.objetoResposta));
  }
  
  public buscarCombatesDaCampanha(sqCampanha: number): Observable<CombateDTO[]> {
    return this.http.get<any>(`http://localhost:8080/campanha/combates/${sqCampanha}`)
    .pipe(map((resposta: any) => resposta.objetoResposta));
  }

  public buscarAnotacoesDaCampanha(
    sqCampanha: number
  ): Observable<AnotacaoDTO[]> {
    return this.http
      .get<any>(`http://localhost:8080/campanha/anotacoes/${sqCampanha}`)
      .pipe(map((resposta: any) => resposta.objetoResposta));
  }

  public deletarCampanha(sqCampanha: number): Observable<String> {
    return this.http.delete<any>(`http://localhost:8080/campanha/${sqCampanha}/deletar`).pipe(map((resposta: RespostaDTO) => resposta.mensagem))
  }

  public alterarCampanha(novaCampanha: CampanhaVO, sqCampanha: number): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8080/campanha/${sqCampanha}/atualizar`,
      novaCampanha
    );
  }
  
  constructor(private http: HttpClient) {}
}
