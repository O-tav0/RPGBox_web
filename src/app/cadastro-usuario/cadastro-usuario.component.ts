import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../models/Usuario.model';
import { UsuarioService } from '../service/Usuario.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../service/Firebase.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css'],
})
export class CadastroUsuarioComponent implements OnInit {
  public formCadastroUsuario: FormGroup = new FormGroup({
    nome: new FormControl(),
    email: new FormControl(),
    senha: new FormControl(),
    confirmaSenha: new FormControl(),
  });

  public cadastrarUsuario(): void {

    if(!this.isSenhasValidas()) {
      alert("As senhas estão diferentes. Preencha novamente!")
      return;
    } 
    if(!this.isCamposValidos()) {
      alert("Algum campo não está preenchido, verifique e preencha todos os campos obrigatórios!")
      return;
    }
    
    let novoUsuario = new Usuario(
      0,
      this.formCadastroUsuario.value.nome,
      this.formCadastroUsuario.value.email,
      this.formCadastroUsuario.value.senha,
      ' '
    );

    this.firebaseService.criarUsuarioFirebase(
      this.formCadastroUsuario.value.email,
      this.formCadastroUsuario.value.senha
    );

    try {
      this.usuarioService
        .cadastrarUsuario(novoUsuario)
        .subscribe((resposta) => {
          alert(resposta.mensagem);
        });

      this.navegarParaTelaLogin();
    } catch (err) {
      alert(err);
    }

  }

  public isCamposValidos(): boolean {
    let formularioValido = true;
    if(this.formCadastroUsuario.value.nome == null || this.formCadastroUsuario.value.email == null || this.formCadastroUsuario.value.senha == null) {
        formularioValido = false;
      }
    return formularioValido;
  }

  public isSenhasValidas(): boolean {
    return this.formCadastroUsuario.value.senha == this.formCadastroUsuario.value.confirmaSenha;
  }

  public navegarParaTelaLogin(): void {
    this.router.navigate(['login']);
  }

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {}
}
