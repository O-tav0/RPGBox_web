import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CombateDTO } from '../models/CombateDTO.model';
import { CombateVO } from '../models/CombateVO.model';
import { map } from 'rxjs/operators';
import { CombateLog } from '../models/CombateLog.model';

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

    constructor(private http: HttpClient) {}
  }

