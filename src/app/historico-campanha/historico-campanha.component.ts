import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Historico } from '../models/Historico.model';
import { EventoCampanhaService } from '../service/EventoCampanha.service';

@Component({
  selector: 'app-historico-campanha',
  templateUrl: './historico-campanha.component.html',
  styleUrls: ['./historico-campanha.component.css']
})
export class HistoricoCampanhaComponent implements OnInit {
  public historicoCampanha: Historico[];
  
  public carregarHistoricoCampanha(): void{
    const sqCampanhaSelecionada = parseInt(this.route.snapshot.params['sqCampanha'], 10);

    this.eventoCampanhaService.buscarHistoricoCampanha(sqCampanhaSelecionada).subscribe((response) => {
      this.historicoCampanha = response
    })

  }

  constructor(private route: ActivatedRoute, private eventoCampanhaService: EventoCampanhaService) { }

  ngOnInit(): void {
    this.carregarHistoricoCampanha();
  
  }

}
