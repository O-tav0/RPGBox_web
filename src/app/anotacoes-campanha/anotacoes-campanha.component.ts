import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnotacaoDTO } from '../models/AnotacaoDTO.model';
import { AnotacaoVO } from '../models/AnotacaoVO.model';
import { AnotacaoService } from '../service/Anotacao.service';
import { CampanhaService } from '../service/Campanha.service';

@Component({
  selector: 'app-anotacoes-campanha',
  templateUrl: './anotacoes-campanha.component.html',
  styleUrls: ['./anotacoes-campanha.component.css']
})
export class AnotacoesCampanhaComponent implements OnInit {

  public displayFormulario: boolean = false;
  public displayLabel: boolean = false;

  public listaDeAnotacoes: AnotacaoDTO[] = [];

  public sqCampanhaSelecionada = parseInt(this.route.snapshot.params['sqCampanha'], 10);

  public formCadastroAnotacao: FormGroup = new FormGroup({
    descricao: new FormControl()
  });

  public carregarAnotacoesDaCampanha(): void {
    this.campanhaService.buscarAnotacoesDaCampanha(this.sqCampanhaSelecionada).subscribe((response) => {
      this.listaDeAnotacoes = response
    })
  }

  public mostrarLabelInicial(): void {
    console.log(this.listaDeAnotacoes.length)
    if(this.listaDeAnotacoes.length == 0) {
      this.displayLabel = true;
    } else {
      this.displayLabel = false;
    }
  }

  public cadastrarAnotacao(): void {
    const novaAnotacao = new AnotacaoVO(this.sqCampanhaSelecionada, this.formCadastroAnotacao.value.descricao);
    
    this.anotacaoService.cadastrarAnotacao(novaAnotacao).subscribe((resposta) => {
      alert('Anotação cadastrada com sucesso!')
      this.carregarAnotacoesDaCampanha();
    })
  }

  public mostrarFormulario(): void {
    this.displayFormulario = true;
    this.displayLabel = false;
  }

  constructor(private campanhaService: CampanhaService, private route: ActivatedRoute, private anotacaoService: AnotacaoService) { }

  ngOnInit(): void {
    this.carregarAnotacoesDaCampanha();
    this.mostrarLabelInicial();
  }

}
