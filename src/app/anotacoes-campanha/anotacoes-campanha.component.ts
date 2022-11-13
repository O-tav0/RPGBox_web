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
  public anotacaoSelecionada: AnotacaoDTO;
  public descricao: string;
  public tituloForm: string;
  public tipoOperacao: number;

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

  public enviarAnotacao(): void {
    const novaAnotacao = new AnotacaoVO(this.sqCampanhaSelecionada, this.descricao);
    
    if(this.tipoOperacao == 1) {
      this.anotacaoService.cadastrarAnotacao(novaAnotacao).subscribe((resposta) => {
        alert('Anotação adicionada com sucesso!')
        this.carregarAnotacoesDaCampanha();
      })
    } else {
      this.anotacaoService.atualizarAnotacao(this.anotacaoSelecionada.sqAnotacao, novaAnotacao).subscribe((resposta) => {
        alert('Anotacao atualizada com sucesso!')
        this.carregarAnotacoesDaCampanha();
      })
    }
  }

  public mostrarFormulario(tipoOperacao: number, anotacao: any): void {
    this.displayFormulario = true;
    this.displayLabel = false;
    this.tipoOperacao = tipoOperacao;

    if(this.tipoOperacao === 2) {
      this.anotacaoSelecionada = anotacao
      this.tituloForm = 'Alterar Anotação';
      this.descricao = anotacao.descricaoAnotacao
    } else {
      this.descricao = '';
      this.tituloForm = 'Cadastrar Anotação';
    }
  }

  public excluirCombate(sqAnotacao: number): void {
    if (confirm("Deseja deletar a anotação ?") == true) {
      this.anotacaoService.deletarAnotacao(sqAnotacao).subscribe((response) => {
        alert("Anotação excluída com sucesso!")
        this.carregarAnotacoesDaCampanha();
      })
    }
  }

  constructor(private campanhaService: CampanhaService, private route: ActivatedRoute, private anotacaoService: AnotacaoService) { }

  ngOnInit(): void {
    this.carregarAnotacoesDaCampanha();
    this.mostrarLabelInicial();
  }

}
