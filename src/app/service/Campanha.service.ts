import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario.model';
import { RespostaDTO } from '../models/RespostaDTO.model';

import { map } from 'rxjs/operators';
import { CampanhaDTO } from '../models/CampanhaDTO.model';
import { CampanhaVO } from '../models/CampanhaVO.model';

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

  constructor(private http: HttpClient) {}
}
