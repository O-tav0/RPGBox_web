import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonagemCampanhaDTO } from '../models/PersonagemCampanhaDTO.model';
import { PersonagemDTO } from '../models/PersonagemDTO.model';
import { CampanhaService } from '../service/Campanha.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TipoDoPersonagemEnum, TipoPersonagem } from '../models/Tipopersonagem.model';
import { TipoDeHabilidadeEnum, TipoHabilidade } from '../models/TipoHabilidade.model';
import { HabilidadePersonagem } from '../models/HabilidadePersonagem.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personagens-campanha',
  templateUrl: './personagens-campanha.component.html',
  styleUrls: ['./personagens-campanha.component.css']
})
export class PersonagensCampanhaComponent implements OnInit {

  public aventureiros: PersonagemDTO[];
  public npcs: PersonagemDTO[];
  public inimigos: PersonagemDTO[];

  public tiposDePersonagens: TipoPersonagem[];
  public tipoSelecionado: TipoPersonagem;

  public tiposDeHabilidades: TipoHabilidade[];
  public tipoHabilidadeSelecionado: TipoHabilidade;

  public habilidades: HabilidadePersonagem[];
  public display: boolean;

  public displayCadastro: boolean;

  public image: File | null = null;
  public imagemPersonagem: any = null;

  public formCadastroPersonagem: FormGroup = new FormGroup({
    nome: new FormControl(),
    raca: new FormControl(),
    classe: new FormControl(),
    tipo: new FormControl(),
    nivel: new FormControl(),
    vida: new FormControl(),
    imagem: new FormControl(),
    tituloHabilidade: new FormControl(),
    descricaoHabilidade: new FormControl(),
  });

  public tratarImagemSelecionada(files: FileList): void {
    const comp = this;
    const arquivo = files.item(0);
    const promise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(arquivo!);
    });

    promise.then((img) => {
      comp.imagemPersonagem = img;
    });
  }

  public esconderCadastro(): void {
    this.displayCadastro = false;
  }

  public mostrarCadastro(): void {
    this.displayCadastro = true;
  }


  public recuperaPersonagensDaCampanha(): void {
    const sqCampanhaSelecionada = parseInt(this.route.snapshot.params['sqCampanha'], 10);
    this.campanhaService.buscarPersonagensCampanhaPorTipo(sqCampanhaSelecionada).subscribe((resposta) => {
      this.aventureiros = resposta.aventureiros;
      this.npcs = resposta.npcs;
      this.inimigos = resposta.inimigos;
    })
  }

  public adicionarHabilidade() {
    let novaHabilidade = new HabilidadePersonagem(this.formCadastroPersonagem.value.descricaoHabilidade, this.formCadastroPersonagem.value.tituloHabilidade, this.tipoHabilidadeSelecionado.nome.toUpperCase())
    this.habilidades.push(novaHabilidade);
    
    this.formCadastroPersonagem.value.descricaoHabilidade = null;
    this.formCadastroPersonagem.value.tituloHabilidade = null; 
    
    this.display = false;
  }

  
  public cadastrarPersonagem(): void {
    console.log('teste')
  }

  public mostrarModalCadastroHabilidade() {
    this.display = true;
  }

  constructor(private campanhaService: CampanhaService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { 

    this.tiposDePersonagens = [
      {nome: 'Aventureiro', valor: TipoDoPersonagemEnum.AVENTUREIRO},
      {nome: 'Inimigo', valor: TipoDoPersonagemEnum.INIMIGO},
      {nome: 'NPC', valor: TipoDoPersonagemEnum.NPC},
 
  ];

  this.tiposDeHabilidades = [
    {nome: 'Ataque', valor: TipoDeHabilidadeEnum.ATAQUE},
    {nome: 'Suporte', valor: TipoDeHabilidadeEnum.SUPORTE}
];
  }

  ngOnInit(): void {
    this.habilidades = [];
    this.displayCadastro = false;
    this.recuperaPersonagensDaCampanha();
  }

}
