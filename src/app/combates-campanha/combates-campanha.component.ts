import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CombateVO, PersonagemCombateVO } from '../models/CombateVO.model';
import { PersonagemDTO } from '../models/PersonagemDTO.model';
import { CampanhaService } from '../service/Campanha.service';
import { CombateService } from '../service/Combate.service';
import { PersonagemService } from '../service/Personagem.service';

@Component({
  selector: 'app-combates-campanha',
  templateUrl: './combates-campanha.component.html',
  styleUrls: ['./combates-campanha.component.css']
})
export class CombatesCampanhaComponent implements OnInit {

  public personagensDaCampanha: PersonagemDTO[];

  public personagensSelecionados: PersonagemDTO[];

  public sqCampanhaSelecionada = parseInt(this.route.snapshot.params['sqCampanha'], 10);

  public displayFormulario: boolean = false;
  public displayLabel: boolean = true;

  public formCadastroCombate: FormGroup = new FormGroup({
    tituloCombate: new FormControl(),
  });

  public cadastrarCombate(): void {
    const personagens = this.preencherObjetoPersonagensSelecionados();
    const novoCombate = new CombateVO(this.sqCampanhaSelecionada, this.formCadastroCombate.value.tituloCombate, personagens); 

    this.CombateService.cadastrarCombnate(novoCombate).subscribe(() => {
      alert('Combate cadastro com sucesso!')
    })

    this.ngOnInit();
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
    })
  }

  constructor(private campanhaService: CampanhaService, private route: ActivatedRoute, private CombateService: CombateService) { }

  ngOnInit(): void {
    this.carregarPersonagensDaCampanha();
    this.personagensSelecionados = []
  } 

}
