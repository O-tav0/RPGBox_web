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
  
  public personagemSelecionado: any = null;
  public indexPersonagemSelecionado = 0;
  public nrTurno = 1;
  public alvoSelecionado: any;
  public danoCausado: any;
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
    if(this.validaCamposAcao() == "ok") {
      this.acoesDoTurno.push(this.getAcaoPersonagem());
      this.reduzirVidaPersonagemAlvo();
      this.trocarPersonagemSelecionado();
  
      this.alvoSelecionado = null
      this.habilidadeSelecionada = null
      this.danoCausado = null
    } else {
      alert(this.validaCamposAcao())
      return;
    }
  }

  public reduzirVidaPersonagemAlvo(): void {
    if(this.products.length == 1) {
      alert('Somente um personagem restante no combate. Finalize o combate!')
    } else {
      console.log(this.alvoSelecionado.personagem.pontosVidaAtual - this.danoCausado <= 0)
      if((this.alvoSelecionado.personagem.pontosVidaAtual - this.danoCausado) < 0 || (this.alvoSelecionado.personagem.pontosVidaAtual - this.danoCausado) == 0) {
        this.products.splice(this.products.indexOf(this.alvoSelecionado), 1);
        this.products = [...this.products];
      } else {
        this.alvoSelecionado.personagem.pontosVidaAtual = this.alvoSelecionado.personagem.pontosVidaAtual - this.danoCausado;
        this.products = [...this.products];
      }
    }
    this.products = [...this.products];
  }

  public trocarTurno(): void {
     const turnoAtual = new Turno();
     turnoAtual.numeroTurno = this.nrTurno;
     turnoAtual.acoesDoTurno = this.acoesDoTurno;

     this.turnosDoCombate.push(turnoAtual)

     this.nrTurno++;
     this.acoesDoTurno = [];
  }

  public getAcaoPersonagem(): Acao {
    const acao = new Acao(this.habilidadeSelecionada, this.transformaPersonagemLog(this.personagemSelecionado.personagem), this.transformaPersonagemLog(this.alvoSelecionado.personagem), this.danoCausado);
    return acao;
  }

  public validaCamposAcao(): string {
    let mensagemValidacao = "ok";
    if(this.habilidadeSelecionada == null) {
      mensagemValidacao = "Selecione uma habilidade do personagem!"
    }
    if(this.alvoSelecionado == null) {
      mensagemValidacao = "Selecione um alvo pra atacar!"
    }
    if(this.danoCausado == null) {
      mensagemValidacao = "Insira o dano!"
    }
    if(this.danoCausado == 0) {
      mensagemValidacao = "O dano tem que ser maior que zero!"
    }
    return mensagemValidacao;
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
      alert('Combate finalizado com sucesso!')
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
