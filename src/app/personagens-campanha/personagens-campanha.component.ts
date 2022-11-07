import { Component, HostListener, OnInit } from '@angular/core';
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
import { PersonagemService } from '../service/Personagem.service';
import { PersonagemVO } from '../models/PersonagemVO.model';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-personagens-campanha',
  templateUrl: './personagens-campanha.component.html',
  styleUrls: ['./personagens-campanha.component.css']
})
export class PersonagensCampanhaComponent implements OnInit {

  public aventureiros: PersonagemDTO[];
  public npcs: PersonagemDTO[];
  public inimigos: PersonagemDTO[];

  public personagemSelecionado: any;
  public habilidadeSelecionada:any = null;

  public tiposDePersonagens: TipoPersonagem[];
  public tipoSelecionado: TipoPersonagem;
  public tipoSelecionadoAtualizado?:TipoPersonagem;

  public tiposDeHabilidades: TipoHabilidade[];
  public tipoHabilidadeSelecionado: TipoHabilidade;
  public tipoHabilidadeSelecionadoAtualizado?:TipoHabilidade;

  public habilidades: HabilidadePersonagem[];
  public habilidadesAtualizadas: HabilidadePersonagem[] = [];
  public display: boolean;
  public displayModalAtualizarHabilidade:boolean;

  public displayCadastro: boolean;
  public displayAlteracao: boolean;

  public image: File | null = null;
  public imagemPersonagem: any = null;

  public imageAtt: File | null = null;
  public imagemPersonagemAtt: any = null;
  public imagemCarregada: any;
  
  public items: MenuItem[];
  public items2: MenuItem[];
  public items3: MenuItem[];
  public items4: MenuItem[];

  public nome: string;
  public raca: string;
  public classe: string;
  public nivel: number;
  public vida: number;
  public tituloHabilidadeAtt: string;
  public descricaoHabilidadeAtt: string;

  public formCadastroPersonagem: FormGroup = new FormGroup({
    nome: new FormControl(),
    raca: new FormControl(),
    classe: new FormControl(),
    nivel: new FormControl(),
    vida: new FormControl(),
    tituloHabilidade: new FormControl(),
    descricaoHabilidade: new FormControl(),
  });

  public tratarImagemSelecionada(): void {
    
    let elem: any;
    elem = $("#imagemPersonagem");
   
    const comp = this;
    const arquivo = elem[0].files[0];
    const promise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(arquivo!);
    });

    promise.then((img) => {
      comp.imagemPersonagem = img;
      alert('Imagem carregada com sucesso');
    });
    
  }

  public tratarImagemSelecionadaAtualizacao(): void {
    
    let elem: any;
    elem = $("#imagemPersonagem");
   
    const comp = this;
    const arquivo = elem[0].files[0];
    const promise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(arquivo!);
    });

    promise.then((img) => {
      comp.imagemPersonagemAtt = img;
      alert('Imagem carregada com sucesso');
    });
    
  }

  public esconderCadastro(): void {
    this.displayCadastro = false;
    this.formCadastroPersonagem.reset();
  }

  public mostrarCadastro(): void {
    this.displayAlteracao = false;
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
    
    this.display = false;
  }

  public adicionarHabilidadeAtualizada() {
      if(this.habilidadeSelecionada != null) {
        let indexParaAtualizar = this.habilidadesAtualizadas.indexOf(this.habilidadeSelecionada)
  
        this.habilidadesAtualizadas[indexParaAtualizar].nomeHabilidade = this.tituloHabilidadeAtt
        this.habilidadesAtualizadas[indexParaAtualizar].descricaoHabilidade = this.descricaoHabilidadeAtt
        this.habilidadesAtualizadas[indexParaAtualizar].tipoHabilidade = this.tipoHabilidadeSelecionadoAtualizado!.nome.toUpperCase()
        this.habilidadeSelecionada = null;
        this.displayModalAtualizarHabilidade = false;

      }else {
        let novaHabilidade = new HabilidadePersonagem(this.descricaoHabilidadeAtt, this.tituloHabilidadeAtt, this.tipoHabilidadeSelecionadoAtualizado!.nome.toUpperCase())
        this.habilidadesAtualizadas.push(novaHabilidade);
        this.displayModalAtualizarHabilidade = false;
        this.habilidadeSelecionada = null;
      }
      this.habilidadeSelecionada = null;      
  }

  public cadastrarPersonagem(): void {
    let img = null
    if(this.imagemPersonagem != null) {
      img = this.imagemPersonagem.split(',')[1]
    }
    
    let sqCampanha = parseInt(this.route.snapshot.params['sqCampanha'], 10);

    let novoPersonagem = new PersonagemVO(this.formCadastroPersonagem.value.nome, 
      this.formCadastroPersonagem.value.raca, 
      this.formCadastroPersonagem.value.classe, 
      sqCampanha,
      this.formCadastroPersonagem.value.vida,
      img,
      this.tipoSelecionado.nome.toUpperCase(),
      this.formCadastroPersonagem.value.nivel,
      this.habilidades);
      
      this.personagemService.cadastrarPersonagem(novoPersonagem).subscribe(() => {
        alert('Personagem cadastrado com sucesso!')
        this.recuperaPersonagensDaCampanha();
      })

      this.formCadastroPersonagem.reset();
      this.habilidades = [];
      this.image = null;
      this.imagemPersonagem = null;
  }

  public atualizarPersonagem(): void {
    let img = null
    if(this.imagemPersonagemAtt != null) {
      img = this.imagemPersonagemAtt.split(',')[1]
    } else {
      img = this.imagemCarregada 
    }
    
    let sqCampanha = parseInt(this.route.snapshot.params['sqCampanha'], 10);

    let novoPersonagem = new PersonagemVO(this.nome, 
      this.raca, 
      this.classe, 
      sqCampanha,
      this.vida,
      img,
      this.tipoSelecionadoAtualizado!.nome.toUpperCase(),
      this.nivel,
      this.habilidadesAtualizadas);

      console.log(novoPersonagem)
      this.personagemService.atualizarPersonagem(novoPersonagem, this.personagemSelecionado.sqPersonagem).subscribe(() => {
        alert('Personagem atualizado com sucesso!')
        this.recuperaPersonagensDaCampanha();
      })

       this.habilidadesAtualizadas = []; 
       this.imageAtt = null;
       this.imagemPersonagemAtt = null;
       this.displayAlteracao = false;
  }

  

  public mostrarModalCadastroHabilidade() {
    this.display = true;
  }

  public mostrarModalCadastroHabilidadeAtualizar() {
    this.displayModalAtualizarHabilidade = true;
  }

  public excluirPersonagem(): void {
    if (confirm("Deseja deletar o personagem ?") == true) {
      this.personagemService.deletarPersonagem(this.personagemSelecionado.sqPersonagem).subscribe((response) => {
        alert("Personagem deletado com sucesso!")
        this.recuperaPersonagensDaCampanha();
      })
    }
  }

  public alterarPersonagem(): void {
    this.displayCadastro = false;
    this.displayAlteracao = true;
    this.classe = this.personagemSelecionado.classePersonagem
    this.habilidadesAtualizadas = this.personagemSelecionado.habilidadesPersonagem    
    this.imagemCarregada = this.personagemSelecionado.imagemPersonagem
    this.nivel = this.personagemSelecionado.nivelPersonagem
    this.nome = this.personagemSelecionado.nomePersonagem;
    this.vida = this.personagemSelecionado.pontosDeVida
    this.raca = this.personagemSelecionado.racaPersonagem
    let tipoDoPersonagemSelecionado = this.tiposDePersonagens.find(o => o.nome == this.personagemSelecionado.tipoPersonagem)
    this.tipoSelecionadoAtualizado = tipoDoPersonagemSelecionado
  }

  @HostListener('document:contextmenu', ['$event'])
  public selecionarPersonagem(personagem: PersonagemDTO) {
    this.personagemSelecionado = personagem;
  }

  public mostrarModalCriarNovaHabilidadeAtualizacao(): void {
    this.tituloHabilidadeAtt = "";
    this.descricaoHabilidadeAtt = "";
    this.mostrarModalCadastroHabilidadeAtualizar();
  }

  public carregarModalHabilidade(habilidade: any) {
    
    this.habilidadeSelecionada = habilidade
    this.tituloHabilidadeAtt = habilidade.nomeHabilidade;
    this.descricaoHabilidadeAtt = habilidade.descricaoHabilidade;
    console.log(habilidade.nomeHabilidade)
    let tipoDaHabilidadeSelecionada = this.tiposDeHabilidades.find(o => o.nome == habilidade.tipoHabilidade)
    console.log(tipoDaHabilidadeSelecionada)
    this.tipoHabilidadeSelecionadoAtualizado = tipoDaHabilidadeSelecionada;
    this.mostrarModalCadastroHabilidadeAtualizar();  
  }

  constructor(private campanhaService: CampanhaService,
     private route: ActivatedRoute,
     private personagemService: PersonagemService
       ) { 

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
    this.tipoSelecionado = {nome: 'Aventureiro', valor: TipoDoPersonagemEnum.AVENTUREIRO}
    this.tipoSelecionadoAtualizado = {nome: 'Aventureiro', valor: TipoDoPersonagemEnum.AVENTUREIRO}
    this.tipoHabilidadeSelecionado = {nome: 'Ataque', valor: TipoDeHabilidadeEnum.ATAQUE}
    this.tipoHabilidadeSelecionadoAtualizado = {nome: 'Ataque', valor: TipoDeHabilidadeEnum.ATAQUE}

    this.items = [
      {
          icon:'pi pi-fw pi-pencil',
          label: 'Editar',
          command: () => this.alterarPersonagem()
      },
      {
          icon:'pi pi-fw pi-trash',
          label: 'Deletar',
          command: () => this.excluirPersonagem()
      }
    ];

    this.items2 = [
      {
          icon:'pi pi-fw pi-pencil',
          label: 'Editar',
          command: () => this.alterarPersonagem()
      },
      {
          icon:'pi pi-fw pi-trash',
          label: 'Deletar',
          command: () => this.excluirPersonagem()
      }
    ];

    this.items3 = [
      {
          icon:'pi pi-fw pi-pencil',
          label: 'Editar',
          command: () => this.alterarPersonagem()
      },
      {
          icon:'pi pi-fw pi-trash',
          label: 'Deletar',
          command: () => this.excluirPersonagem()
      }
    ];

    this.items4 = [
      {
          icon:'pi pi-fw pi-pencil',
          label: 'Editar',
          command: () => this.alterarPersonagem()
      }
    ];
  }
}
