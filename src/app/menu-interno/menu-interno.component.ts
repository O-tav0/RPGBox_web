import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../service/Firebase.service';

@Component({
  selector: 'menu-interno',
  templateUrl: './menu-interno.component.html',
  styleUrls: ['./menu-interno.component.css'],
})
export class MenuInternoComponent implements OnInit {
  public isCampanhaSelecionada: boolean = false;

  public deslogarUsuario(): void {
    this.firebaseService.deslogarUsuario();
  }

  public verificarSeCampanhaEstaSelecionada(): void {
    console.log();
    if (localStorage.getItem('sqCampanhaSelecionada') != null) {
      this.isCampanhaSelecionada = true;
    } else {
      this.isCampanhaSelecionada = false;
    }
  }

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.verificarSeCampanhaEstaSelecionada();
  }
}
