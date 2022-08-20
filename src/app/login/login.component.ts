import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseService } from '../service/Firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public esconderMostrarSenha(): void {
    const type =
      document.getElementById('senha')?.getAttribute('type') === 'password'
        ? 'text'
        : 'password';
    document.getElementById('senha')?.setAttribute('type', type);
  }

  public formLogin: FormGroup = new FormGroup({
    email: new FormControl(),
    senha: new FormControl(),
  });

  public realizarLogin(): void {
    this.firebaseService.fazerLoginFirebase(
      this.formLogin.value.email,
      this.formLogin.value.senha
    );
  }

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {}
}
