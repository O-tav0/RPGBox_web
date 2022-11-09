import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnotacaoDTO } from '../models/AnotacaoDTO.model';
import { CombateDTO } from '../models/CombateDTO.model';
import { HabilidadePersonagem } from '../models/HabilidadePersonagem.model';
import { Personagem } from '../models/Personagem.model';
import { PersonagemCombateDTO } from '../models/PersonagemCombateDTO.model';
import { PersonagemDTO } from '../models/PersonagemDTO.model';
import { CampanhaService } from '../service/Campanha.service';
import { CombateService } from '../service/Combate.service';
import { Location } from '@angular/common';
import { Acao } from '../models/Acao.model';
import { CombateLog } from '../models/CombateLog.model';
import { Turno } from '../models/Turno.model';
import { PersonagemLog } from '../models/PersonagemLog.model';

@Component({
  selector: 'app-genrenciar-combate',
  templateUrl: './genrenciar-combate.component.html',
  styleUrls: ['./genrenciar-combate.component.css']
})
export class GenrenciarCombateComponent implements OnInit {

  public combateSelecionado: CombateDTO;
  public products: PersonagemCombateDTO[] = [];
  
  public personagemSelecionado: any;
  public indexPersonagemSelecionado = 0;
  public nrTurno = 1;
  public alvoSelecionado: PersonagemCombateDTO;
  public danoCausado: number;
  public acoesDoTurno: Acao[];
  public turnosDoCombate: Turno[];

  public habilidadeSelecionada: any = null;

  public logDoCombate: CombateLog = new CombateLog();

  public displayModal: boolean = false;

  private sqCombateSelecionado = parseInt(this.route.snapshot.params['sqCombate'], 10);
 
  public carregarPersonagensDoCombate(): void {
    this.combateService.buscarCombate(this.sqCombateSelecionado).subscribe((response) => {
      this.combateSelecionado = response
      this.products = this.combateSelecionado.personagensDoCombate.sort(function (a, b) {
        if (a.nrOrdemCombate > b.nrOrdemCombate) {
          return 1;
        }
        if (a.nrOrdemCombate < b.nrOrdemCombate) {
          return -1;
        }
        return 0;
      });
      this.products.forEach((obj) => {
        obj.personagem.pontosVidaAtual = obj.personagem.pontosDeVida
      })
      
      this.personagemSelecionado = this.products[0]   
    })
  }

  public finalizarAcao(): void {
    this.acoesDoTurno.push(this.getAcaoPersonagem());
    this.reduzirVidaPersonagemAlvo();
    this.trocarPersonagemSelecionado();
    this.alvoSelecionado = this.products[0]
    this.habilidadeSelecionada = this.personagemSelecionado.personagem.habilidadesPersonagem[0] 
  }

  public reduzirVidaPersonagemAlvo(): void {
    if(this.products.length == 1) {
      alert('Somente um personagem restante no combate. Finalize o combate!')
    } else {
      this.alvoSelecionado.personagem.pontosVidaAtual = this.alvoSelecionado.personagem.pontosVidaAtual - this.danoCausado;
    if(this.alvoSelecionado.personagem.pontosVidaAtual <= 0) {
      this.products.splice(this.products.indexOf(this.alvoSelecionado), 1);
      this.products = [...this.products];
    }
    }
  }

  public trocarTurno(): void {
     const turnoAtual = new Turno();
     turnoAtual.numeroTurno = this.nrTurno;
     turnoAtual.acoesDoTurno = this.acoesDoTurno;

     this.turnosDoCombate.push(turnoAtual)

     this.nrTurno++;
     this.acoesDoTurno = [];
     console.log(this.turnosDoCombate)
  }

  public getAcaoPersonagem(): Acao {
    console.log(this.products)
    const acao = new Acao(this.habilidadeSelecionada, this.transformaPersonagemLog(this.personagemSelecionado.personagem), this.transformaPersonagemLog(this.alvoSelecionado.personagem), this.danoCausado);
    return acao;
  }

  public transformaPersonagemLog(personagem: PersonagemDTO): PersonagemLog {
    const personagemLog = new PersonagemLog(personagem.sqPersonagem,
       personagem.classePersonagem,
       personagem.nivelPersonagem,
       personagem.nomePersonagem,
       personagem.pontosVida,
       personagem.racaPersonagem,
       personagem.tipoPersonagem)

       return personagemLog;
  }

  public trocarPersonagemSelecionado(): void {
    this.indexPersonagemSelecionado = this.indexPersonagemSelecionado + 1;
    if(this.indexPersonagemSelecionado >= this.products.length) {
      this.indexPersonagemSelecionado = 0;
      this.trocarTurno();
    }
    if(this.products.length == 1) {
      this.personagemSelecionado  = this.products[0]
    } 
    this.personagemSelecionado  = this.products[this.indexPersonagemSelecionado]
  }

  public gravarLogDoCombate(): void {
    const ultimoNrTurno = [...this.turnosDoCombate].pop()?.numeroTurno as number;
    if(this.nrTurno > ultimoNrTurno) {
     const turnoAtual = new Turno();
     turnoAtual.numeroTurno = this.nrTurno;
     turnoAtual.acoesDoTurno = this.acoesDoTurno;

     this.turnosDoCombate.push(turnoAtual)
    }
    this.logDoCombate.resumoCombate = this.turnosDoCombate;
    this.combateService.atualizarCombate(this.sqCombateSelecionado, this.logDoCombate).subscribe(() => {
      alert('Combate atualizado com sucesso!')
      this.location.back();
    })
  }

  public voltarPagina(): void {
    if (confirm("Deseja voltar ? O progresso do combate será perdido!") == true) {
      this.location.back(); 
    } 
  }

  public showModalDialog() {
    this.displayModal = true;
  }

  constructor(private route: ActivatedRoute, private combateService: CombateService, private location: Location) { 
    
  }

  ngOnInit(): void {
    this.carregarPersonagensDoCombate();
    this.acoesDoTurno = [];
    this.turnosDoCombate = [];
  }

}
