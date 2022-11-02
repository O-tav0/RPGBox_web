import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { CombateDTO } from '../models/CombateDTO.model';
import { CombateLog } from '../models/CombateLog.model';
import { CombateVO, PersonagemCombateVO } from '../models/CombateVO.model';
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

  public personagensSelecionados: PersonagemDTO[];

  public sqCampanhaSelecionada = parseInt(this.route.snapshot.params['sqCampanha'], 10);

  public displayFormulario: boolean = false;
  public displayLabel: boolean = false;

  public combatesCampanha: CombateDTO[] = [];

  public displayModalLog: boolean = false;

  public turnosDoCombate: Turno[];

  public formCadastroCombate: FormGroup = new FormGroup({
    tituloCombate: new FormControl(),
  });

  public cadastrarCombate(): void {
    const personagens = this.preencherObjetoPersonagensSelecionados();
    const novoCombate = new CombateVO(this.sqCampanhaSelecionada, this.formCadastroCombate.value.tituloCombate, personagens); 

    this.combateService.cadastrarCombnate(novoCombate).subscribe(() => {
      alert('Combate cadastro com sucesso!')
      this.carregarCombatesDaCampanha();
    })

    this.carregarCombatesDaCampanha();
    this.formCadastroCombate.reset();
  }

  public preencherObjetoPersonagensSelecionados(): PersonagemCombateVO[] {
    const personagensSelecionadosVO: PersonagemCombateVO[] = [];
    this.personagensSelecionados.forEach((personagem) => {
      const vo = new PersonagemCombateVO(personagem.sqPersonagem);
      personagensSelecionadosVO.push(vo)
    })

    return personagensSelecionadosVO;
  }

  public mostrarFormulario(): void {
    this.displayFormulario = true;
    this.displayLabel = false;
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
      console.log(this.combatesCampanha)
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

  constructor(private campanhaService: CampanhaService, private route: ActivatedRoute, private combateService: CombateService, private roteador: Router) { }

  ngOnInit(): void {
    this.carregarPersonagensDaCampanha();
    this.carregarCombatesDaCampanha();
    this.personagensSelecionados = []
  } 

}
