import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CampanhaDTO } from '../models/CampanhaDTO.model';
import { CampanhaService } from '../service/Campanha.service';
import { FirebaseService } from '../service/Firebase.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  public listaDeCampanhas: Observable<CampanhaDTO[]>;

  private buscarCampanhasDoUsuario() {
    const emailUsuarioLogado =
      this.firebaseService.recuperaEmailUsuarioLogado();
    this.listaDeCampanhas =
      this.campanhaService.buscarCampanhasPorEmailUsuario(emailUsuarioLogado);
  }

  constructor(
    private campanhaService: CampanhaService,
    private firebaseService: FirebaseService
  ) {
    this.buscarCampanhasDoUsuario();
  }

  ngOnInit(): void {}
}
