import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CampanhaDTO } from '../models/CampanhaDTO.model';
import { Historico } from '../models/Historico.model';
import { RespostaDTO } from '../models/RespostaDTO.model';


@Injectable({
  providedIn: 'root',
})
export class EventoCampanhaService {
  public buscarHistoricoCampanha(
    sqCampanha: number
  ): Observable<Historico[]> {
    return this.http
      .get<any>(`http://localhost:8080/eventos/${sqCampanha}`)
      .pipe(map((resposta: any) => resposta.objetoResposta));
  }
  constructor(private http: HttpClient) {}
}
