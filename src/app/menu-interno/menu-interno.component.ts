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
  public visibleSidebar1: any;

  public dadosDaRolagem: string[];
  public qtdD4: number = 0;
  public qtdD6: number = 0;
  public qtdD8: number = 0;
  public qtdD10: number = 0;
  public qtdD12: number = 0;
  public qtdD20: number = 0;
  public qtdD100: number = 0;

  public resultadosD4: number[] = [];
  public resultadosD6: number[] = []
  public resultadosD8: number[] = [];
  public resultadosD10: number[] = [];
  public resultadosD12: number[] = [];
  public resultadosD20: number[] = [];
  public resultadosD100: number[]= [];

  public totalD4: number
  public totalD6: number
  public totalD8: number
  public totalD10: number
  public totalD12: number
  public totalD20: number
  public totalD100: number
   
  public deslogarUsuario(): void {
    this.firebaseService.deslogarUsuario();
  }

  public verificarSeCampanhaEstaSelecionada(): void {
    if (localStorage.getItem('sqCampanhaSelecionada') != null) {
      this.isCampanhaSelecionada = true;
      this.sqCampanhaSelecionada = localStorage.getItem('sqCampanhaSelecionada')!;
    } else {
      this.isCampanhaSelecionada = false;
    }
  }

  public adicionarDadoNaRolagem(dado: string) {
    switch(dado) {
      case '1d4':
        this.qtdD4++;
        break;
      case '1d6':
        this.qtdD6++;
        break; 
      case '1d8':
        this.qtdD8++;
        break;
      case '1d10':
        this.qtdD10++;
        break;
      case '1d12':
        this.qtdD12++;
        break;
      case '1d20':
        this.qtdD20++;
        break;
      case '1d100':
        this.qtdD100++;
        break; 
    }
  }

  public rolarDados(): void {
    
    for(let i =0; i<this.qtdD4;i++) {
      let resultado = Math.floor(Math.random() * 4) + 1;
      this.resultadosD4.push(resultado)
    }
    this.totalD4 = this.resultadosD4.reduce((soma, elemento) => soma + elemento,0)

    for(let j=0; j<this.qtdD6;j++) {
      let resultado = Math.floor(Math.random() * 6) + 1;
      this.resultadosD6.push(resultado)
    }
    this.totalD6 = this.resultadosD6.reduce((soma, elemento) => soma + elemento,0)

    for(let k=0; k<this.qtdD8;k++) {
      let resultado = Math.floor(Math.random() * 8) + 1;
      this.resultadosD8.push(resultado)
    }
    this.totalD8 = this.resultadosD8.reduce((soma, elemento) => soma + elemento,0)

    for(let l=0; l<this.qtdD10;l++) {
      let resultado = Math.floor(Math.random() * 10) + 1;
      this.resultadosD10.push(resultado)
    }
    this.totalD10 = this.resultadosD10.reduce((soma, elemento) => soma + elemento,0)

    for(let m=0; m<this.qtdD12;m++) {
      let resultado = Math.floor(Math.random() * 12) + 1;
      this.resultadosD12.push(resultado)
    }
    this.totalD12 = this.resultadosD12.reduce((soma, elemento) => soma + elemento,0)

    for(let n=0; n<this.qtdD20;n++) {
      let resultado = Math.floor(Math.random() * 20) + 1;
      this.resultadosD20.push(resultado)
    }
    this.totalD20 = this.resultadosD20.reduce((soma, elemento) => soma + elemento,0)

    for(let p=0; p<this.qtdD100;p++) {
      let resultado = Math.floor(Math.random() * 100) + 1;
      this.resultadosD100.push(resultado)
    }
    this.totalD100 = this.resultadosD100.reduce((soma, elemento) => soma + elemento,0)

  }

  public reiniciarJogadas(): void {
    this.qtdD4 = 0;
    this.qtdD6 =0;
    this.qtdD8 = 0;
    this.qtdD10 = 0;
    this.qtdD12 = 0;
    this.qtdD20 = 0;
    this.qtdD100 =0;

    this.resultadosD4 = [];
    this.resultadosD6 = [];
    this.resultadosD8 = [];
    this.resultadosD10 = [];
    this.resultadosD12 = [];
    this.resultadosD20 = [];
    this.resultadosD100 = [];

    this.totalD4 = 0;
    this.totalD6 =0;
    this.totalD8 = 0;
    this.totalD10 = 0;
    this.totalD12 = 0;
    this.totalD20 = 0;
    this.totalD100 =0;
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
              items: [{label: 'Combates', routerLink:[`/campanha/${this.sqCampanhaSelecionada}/combates`], icon: 'pi pi-shield'}],
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


