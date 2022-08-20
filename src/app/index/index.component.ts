import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CampanhaDTO } from '../models/CampanhaDTO.model';
import { CampanhaService } from '../service/Campanha.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  public listaDeCampanhas: Observable<CampanhaDTO[]>;

  private buscarCampanhasDoUsuario(email: string) {
    this.listaDeCampanhas =
      this.campanhaService.buscarCampanhasPorEmailUsuario(email);
  }

  constructor(private campanhaService: CampanhaService) {
    this.buscarCampanhasDoUsuario('teste@gmail.com');
  }

  ngOnInit(): void {}
}
