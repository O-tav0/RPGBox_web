import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { AtualizaCombateVO } from '../models/AtualizaCombateVO.model';
import { CombateDTO } from '../models/CombateDTO.model';
import { CombateLog } from '../models/CombateLog.model';
import { CombateVO, PersonagemCombateVO } from '../models/CombateVO.model';
import { PersonagemCombateDTO } from '../models/PersonagemCombateDTO.model';
import { PersonagemDTO } from '../models/PersonagemDTO.model';
import { Turno } from '../models/Turno.model';
import { CampanhaService } from '../service/Campanha.service';
import { CombateService } from '../service/Combate.service';
import { PersonagemService } from '../service/Personagem.service';

@Component({
  selector: 'app-combates-campanha',
  templateUrl: './combates-campanha.component.html',
  styleUrls: ['./combates-campanha.component.css']
})
export class CombatesCampanhaComponent implements OnInit {

  public personagensDaCampanha: PersonagemDTO[] = [];
  public personagensDaCampanhaDisponiveis: PersonagemDTO[] = [];

  public personagensSelecionados: PersonagemDTO[];
  public personagensDoCombate: PersonagemDTO[];

  public sqCampanhaSelecionada = parseInt(this.route.snapshot.params['sqCampanha'], 10);

  public displayFormulario: boolean = false;
  public displayFormularioAlteracao: boolean = false;
  public tituloTela: string;

  public displayLabel: boolean = false;

  public combatesCampanha: CombateDTO[] = [];
  public combateSelecionado: CombateDTO;

  public displayModalLog: boolean = false;

  public turnosDoCombate: Turno[];

  public formCadastroCombate: FormGroup = new FormGroup({
    tituloCombate: new FormControl(),
  });
  public tituloCombateAtualizar: string;

  public cadastrarCombate(): void {
    const personagens = this.preencherObjetoPersonagensSelecionados(this.personagensSelecionados);
    const novoCombate = new CombateVO(this.sqCampanhaSelecionada, this.formCadastroCombate.value.tituloCombate, personagens); 

    this.combateService.cadastrarCombnate(novoCombate).subscribe(() => {
      alert('Combate cadastro com sucesso!')
      this.carregarCombatesDaCampanha();
    })

    this.carregarCombatesDaCampanha();
    this.formCadastroCombate.reset();
  }

  public atualizarCombate(): void {
    const personagens = this.preencherObjetoPersonagensSelecionados(this.personagensDoCombate);
    const combateAtualizado = new AtualizaCombateVO(this.tituloCombateAtualizar, personagens); 

    console.table(personagens)
    this.combateService.atualizarIntegrantesCombate(this.combateSelecionado.sqCombate, combateAtualizado).subscribe(() => {
      alert('Combate atualizado com sucesso!')
      this.carregarCombatesDaCampanha();
      this.displayFormularioAlteracao = false;
    })
    this.carregarCombatesDaCampanha();
    this.tituloCombateAtualizar = "";
  }

  public preencherObjetoPersonagensSelecionados(personagensSelecionados :PersonagemDTO[]): PersonagemCombateVO[] {
    const personagensSelecionadosVO: PersonagemCombateVO[] = [];
    personagensSelecionados.forEach((personagem) => {
      const vo = new PersonagemCombateVO(personagem.sqPersonagem);
      personagensSelecionadosVO.push(vo)
    })

    return personagensSelecionadosVO;
  }

  public mostrarFormulario(): void {
    this.displayFormularioAlteracao = false;
    this.displayFormulario = true;
    this.displayLabel = false;
    this.tituloTela = "Cadastre um combate";
  }

  public mostrarFormularioAlteracao(combate: CombateDTO): void {
    this.displayFormulario = false;
    this.displayFormularioAlteracao = true;
    this.displayLabel = false;
    this.tituloTela = "Alteração de combate";
    this.combateSelecionado = combate;
    
    this.combateService.buscarPersonagensDoCombate(this.combateSelecionado.sqCombate).subscribe((resposta) => {
      this.personagensDoCombate = resposta

      // this.personagensDaCampanhaDisponiveis = [];
      // for(let k=0; k<this.personagensDaCampanha.length;k++) {
      //   let elemento = this.personagensDaCampanha[k];
      //   this.personagensDaCampanhaDisponiveis.push(elemento) 
      // }
      
      // for(let i=0; i < this.personagensDaCampanhaDisponiveis.length; i++) {
      //   for(let j=0; j<this.personagensDoCombate.length;j++) {
      //     let personagemJaEstaNoCombate = this.personagensDaCampanhaDisponiveis[i].sqPersonagem == this.personagensDoCombate[j].sqPersonagem;
      //     console.log("Comparando sqPersonagem da lista total" + this.personagensDaCampanhaDisponiveis[i].sqPersonagem + "com " + this.personagensDoCombate[j].sqPersonagem +"da lista final " + " resultado: " + personagemJaEstaNoCombate)
      //     if(personagemJaEstaNoCombate) {

      //       this.personagensDaCampanhaDisponiveis.splice(this.personagensDaCampanhaDisponiveis.findIndex(element => element.sqPersonagem == this.personagensDaCampanhaDisponiveis[i].sqPersonagem),1);
      //     }
      //   }
      // }
    })

    this.combateService.buscarPersonagensDisponiveisCombate(this.combateSelecionado.sqCombate).subscribe((resposta) => {
      this.personagensDaCampanhaDisponiveis = resposta
    })
    
    this.tituloCombateAtualizar = this.combateSelecionado.tituloCombate

  }

  public carregarPersonagensDaCampanha(): void {
  
    this.campanhaService.buscarTodosPersonagensCampanha(this.sqCampanhaSelecionada).subscribe((resposta) => {
      this.personagensDaCampanha = resposta

      if(this.personagensDaCampanha.length > 0) {
        this.displayLabel = false;
      } else {
        this.displayLabel = true;
      }
    })
  }

  public carregarCombatesDaCampanha(): void {
    this.campanhaService.buscarCombatesDaCampanha(this.sqCampanhaSelecionada).subscribe((response) => {
      this.combatesCampanha = response;
    })
    
  }

  public confirm(sqCombate: number): void {
    if (confirm("Deseja iniciar o combate ? Uma vez iniciado, precisa ser finalizado!") == true) {
      this.roteador.navigate([`/combate/${sqCombate}/gerenciar`])
    } 
  }

  public mostrarModalLog(resumoCombate: any): void {
    this.turnosDoCombate = resumoCombate;
    console.log(this.turnosDoCombate)
    console.table(this.turnosDoCombate)
    this.displayModalLog = true;
  }

  public excluirCombate(sqCombate: number): void {
    if (confirm("Deseja deletar o combate ?") == true) {
      this.combateService.deletarCombate(sqCombate).subscribe((response) => {
        alert(response)
        this.carregarCombatesDaCampanha();
      })
    }
  }

  public adicionarPersonagem(event: any):void {
    let personagemJaEstaNoCombate = this.personagensDoCombate.find((elemento) => elemento.sqPersonagem == event.items[0].sqPersonagem)

    if(personagemJaEstaNoCombate) {
      alert("Esse personagem já está no combate!")
    }
  }

  public teste(personagem: any):void {
    console.log(personagem);
    // let personagemJaEstaNoCombate = this.personagensDoCombate.some((elemento) => elemento.sqPersonagem == personagem.sqPersonagem)
    // return !personagemJaEstaNoCombate;
  }

  constructor(private campanhaService: CampanhaService, private route: ActivatedRoute, private combateService: CombateService, private roteador: Router) { }

  ngOnInit(): void {
    this.carregarPersonagensDaCampanha();
    this.carregarCombatesDaCampanha();
    this.personagensSelecionados = []
  } 

}
