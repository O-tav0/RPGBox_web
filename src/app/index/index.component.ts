import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CampanhaDTO } from '../models/CampanhaDTO.model';
import { CampanhaService } from '../service/Campanha.service';
import { FirebaseService } from '../service/Firebase.service';
import * as $ from 'jquery';
import { FormControl, FormGroup } from '@angular/forms';
import { CampanhaVO } from '../models/CampanhaVO.model';
import { Route, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  public listaDeCampanhas: CampanhaDTO[];
  public display: boolean;
  public displayAlterarModal: boolean;
  public image: File | null = null;
  public imagemCampanha: any = null;
  public imagemCampanhaAtualizar: any = null;
  public emailUsuarioLogado: string;
  public titulo: string;
  public descricao: string;
  public campanhaSelecionada :CampanhaDTO; 

  public formCadastroCampanha: FormGroup = new FormGroup({
    titulo: new FormControl(),
    descricao: new FormControl(),
  });

  private buscarCampanhasDoUsuario() {
    this.emailUsuarioLogado = this.firebaseService.recuperaEmailUsuarioLogado();
    this.campanhaService.buscarCampanhasPorEmailUsuario(this.emailUsuarioLogado).subscribe((response) => {
      this.listaDeCampanhas = response

      this.listaDeCampanhas.forEach((obj) => {
        obj.imagemCampanha = 'data:image/jpeg;base64,' + obj.imagemCampanha;
      })
    })
  }

  public selecionarCampanha(sqCampanha: number): void {
    localStorage.setItem('sqCampanhaSelecionada', sqCampanha.toString());
  }

  public limparSelecaoCampanha(): void {
    localStorage.removeItem('sqCampanhaSelecionada');
  }

  public mostrarModalCadastroCampanha() {
    this.display = true;
  }

  public mostrarModalAlterarCampanha(campanhaSelecionado: CampanhaDTO) {
    this.displayAlterarModal = true;
    this.campanhaSelecionada = campanhaSelecionado;

    this.descricao = this.campanhaSelecionada.descricaoCampanha
    this.titulo = this.campanhaSelecionada.tituloCampanha
    this.imagemCampanhaAtualizar = this.campanhaSelecionada.imagemCampanha
  }

  public cadastrarCampanha(): void {

    if(this.isFormularioValido()) {
      let novaCampanha = new CampanhaVO(
        this.formCadastroCampanha.value.titulo,
        this.imagemCampanha.split(',')[1],
        this.formCadastroCampanha.value.descricao,
        this.emailUsuarioLogado
      );
      
      this.campanhaService.cadastrarCampanha(novaCampanha).subscribe(() => {
        alert('Campanha adicionada com sucesso!');
        this.display = false;
        this.imagemCampanha = null;
        this.ngOnInit();
      });
  
      this.display = false;
      this.imagemCampanha = "";
      this.image = null;
      this.formCadastroCampanha.reset();
      this.ngOnInit();
    } else {
      alert("Algum campo não está preenchido, verifique e preencha todos os campos obrigatórios!")
      return;
    }
  }

  public isFormularioValido(): boolean {
    let isCamposValidos = true;
    if(this.formCadastroCampanha.value.titulo == null || this.formCadastroCampanha.value.descricao) {
      isCamposValidos = false;
    }
    return isCamposValidos;
  }

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
      comp.imagemCampanha = img;
    });
  }

  public tratarImagemSelecionadaParaAtualizar(files: FileList): void {
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
      comp.imagemCampanhaAtualizar = img;
    });
  }

  public excluirCampanha(campanha: CampanhaDTO): void {
    if (confirm("Deseja deletar a campanha "+ campanha.tituloCampanha +"?") == true) {
      this.campanhaService.deletarCampanha(campanha.sqCampanha).subscribe((response) => {
        alert(response)
        this.buscarCampanhasDoUsuario()
      })
    }
  }

  public alterarCampanha(): void {
    let novaCampanha = new CampanhaVO(
      this.titulo,
      this.imagemCampanhaAtualizar.split(',')[1],
      this.descricao,
      this.emailUsuarioLogado
    );

    this.campanhaService.alterarCampanha(novaCampanha, this.campanhaSelecionada.sqCampanha).subscribe(() => {
      alert('Campanha atualizada com sucesso!');
      this.displayAlterarModal = false;
      this.imagemCampanhaAtualizar = null;
      this.titulo = "",
      this.descricao = "";
      this.ngOnInit();
    });
  }

  constructor(
    private campanhaService: CampanhaService,
    private firebaseService: FirebaseService,
  ) {}

  ngOnInit(): void {
    this.limparSelecaoCampanha();
    this.buscarCampanhasDoUsuario();
  }
}
