import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CampanhaDTO } from '../models/CampanhaDTO.model';
import { CampanhaService } from '../service/Campanha.service';
import { FirebaseService } from '../service/Firebase.service';
import * as $ from 'jquery';
import { FormControl, FormGroup } from '@angular/forms';
import { CampanhaVO } from '../models/CampanhaVO.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  public listaDeCampanhas: Observable<CampanhaDTO[]>;
  public display: boolean;
  public image: File | null = null;
  public imagemCampanha: any = null;
  public emailUsuarioLogado: string;

  public formCadastroCampanha: FormGroup = new FormGroup({
    titulo: new FormControl(),
    descricao: new FormControl(),
  });

  private buscarCampanhasDoUsuario() {
    this.emailUsuarioLogado = this.firebaseService.recuperaEmailUsuarioLogado();
    this.listaDeCampanhas = this.campanhaService.buscarCampanhasPorEmailUsuario(
      this.emailUsuarioLogado
    );
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

  public cadastrarCampanha(): void {
    console.log(this.imagemCampanha);
    let novaCampanha = new CampanhaVO(
      this.formCadastroCampanha.value.titulo,
      this.imagemCampanha.substring(22, this.imagemCampanha.length - 1),
      this.formCadastroCampanha.value.descricao,
      this.emailUsuarioLogado
    );

    this.campanhaService.cadastrarCampanha(novaCampanha).subscribe(() => {
      alert('Campanha cadastrada com sucesso!');
      this.display = false;
      this.ngOnInit();
    });
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

  constructor(
    private campanhaService: CampanhaService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.limparSelecaoCampanha();
    this.buscarCampanhasDoUsuario();
  }
}
