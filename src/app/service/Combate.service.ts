import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CombateVO } from '../models/CombateVO.model';

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
    constructor(private http: HttpClient) {}
  }