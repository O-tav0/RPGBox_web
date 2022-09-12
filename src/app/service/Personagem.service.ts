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
import { PersonagemVO } from '../models/PersonagemVO.model';

@Injectable({
  providedIn: 'root',
})
export class PersonagemService {


public cadastrarPersonagem(novoPersonagem: PersonagemVO): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/personagem/novo`,
      novoPersonagem
    );
  }

  constructor(private http: HttpClient) {}
}
