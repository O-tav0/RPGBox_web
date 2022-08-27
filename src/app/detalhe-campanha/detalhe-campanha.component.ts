import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CampanhaDTO } from '../models/CampanhaDTO.model';
import { CampanhaService } from '../service/Campanha.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-detalhe-campanha',
  templateUrl: './detalhe-campanha.component.html',
  styleUrls: ['./detalhe-campanha.component.css'],
})
export class DetalheCampanhaComponent implements OnInit {
  public campanhaSelecionada: Observable<CampanhaDTO>;
  //public personagensCampanha: Observable<PersonagemDTO[]>;

  public carregarCampanha(): void {
    const sqCampanhaSelecionada = parseInt(
      this.route.snapshot.params['sqCampanha'],
      10
    );
    this.campanhaSelecionada = this.campanhaService.buscarCampanhaPorSqCampanha(
      sqCampanhaSelecionada
    );
  }

  public carregarPersonagens(): void {}

  constructor(
    private campanhaService: CampanhaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carregarCampanha();
    this.carregarPersonagens();
  }
}

export class DialogDemo {}
