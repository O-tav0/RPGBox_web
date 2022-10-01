import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public cadastrarUsuario(novoUsuario: Usuario): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/usuario/novo`,
      novoUsuario
    );
  }

  constructor(private http: HttpClient) {}
}
