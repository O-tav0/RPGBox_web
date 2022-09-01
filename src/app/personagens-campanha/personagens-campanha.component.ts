import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonagemCampanhaDTO } from '../models/PersonagemCampanhaDTO.model';
import { PersonagemDTO } from '../models/PersonagemDTO.model';
import { CampanhaService } from '../service/Campanha.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-personagens-campanha',
  templateUrl: './personagens-campanha.component.html',
  styleUrls: ['./personagens-campanha.component.css']
})
export class PersonagensCampanhaComponent implements OnInit {

  public aventureiros: PersonagemDTO[];
  public npcs: PersonagemDTO[];
  public inimigos: PersonagemDTO[];


  public recuperaPersonagensDaCampanha(): void {
    const sqCampanhaSelecionada = parseInt(this.route.snapshot.params['sqCampanha'], 10);
    this.campanhaService.buscarPersonagensCampanhaPorTipo(sqCampanhaSelecionada).subscribe((resposta) => {
      this.aventureiros = resposta.aventureiros;
      this.npcs = resposta.npcs;
      this.inimigos = resposta.inimigos;
    })
  }

  constructor(private campanhaService: CampanhaService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.recuperaPersonagensDaCampanha();
  }

}
