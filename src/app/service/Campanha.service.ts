import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario.model';
import { RespostaDTO } from '../models/RespostaDTO.model';

import { map } from 'rxjs/operators';
import { CampanhaDTO } from '../models/CampanhaDTO.model';

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

  // public pedidosPorCliente(codigo: number): Observable<Pedido[]> {
  //     return this.http.get(`http://localhost:8080/pedidos/porCliente?codigo=${codigo}`).pipe(map((resposta: any) => resposta))
  // }

  constructor(private http: HttpClient) {}
}
