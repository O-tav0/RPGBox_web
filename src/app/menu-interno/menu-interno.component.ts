import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { FirebaseService } from '../service/Firebase.service';

@Component({
  selector: 'menu-interno',
  templateUrl: './menu-interno.component.html',
  styleUrls: ['./menu-interno.component.css'],
})
export class MenuInternoComponent implements OnInit {
  public isCampanhaSelecionada: boolean = false;
  public items: MegaMenuItem[];
  public sqCampanhaSelecionada: string;

  public deslogarUsuario(): void {
    this.firebaseService.deslogarUsuario();
  }

  public verificarSeCampanhaEstaSelecionada(): void {
    console.log();
    if (localStorage.getItem('sqCampanhaSelecionada') != null) {
      this.isCampanhaSelecionada = true;
      this.sqCampanhaSelecionada = localStorage.getItem('sqCampanhaSelecionada')!;
    } else {
      this.isCampanhaSelecionada = false;
    }
  }

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.verificarSeCampanhaEstaSelecionada();

    this.items = [
      {
        label: 'Campanha',
        items: [
          [
            {
              items: [{label: 'Personagens', routerLink:[`/campanha/${this.sqCampanhaSelecionada}/personagens`], icon: 'pi pi-users'}],
            },
            {
              items: [{label: 'Anotações', routerLink:[`/campanha/${this.sqCampanhaSelecionada}/anotacoes`], icon: 'pi pi-book'}],
            },
            {
              items: [{label: 'Combate', routerLink:[`/campanha/${this.sqCampanhaSelecionada}/combates`], icon: 'pi pi-shield'}],
            },
            {
              items: [{label: 'Linha do tempo', routerLink:[`/campanha/${this.sqCampanhaSelecionada}/linhaDoTempo`], icon: 'pi pi-history'}],
            },
          ],
        ],
      },
    ];
  }
}
