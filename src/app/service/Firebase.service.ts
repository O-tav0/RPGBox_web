// Import the functions you need from the SDKs you need
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBC98T2JgVqp9koVI47gG8AzSwW_jG0bto',
  authDomain: 'rpgbox-82296.firebaseapp.com',
  projectId: 'rpgbox-82296',
  storageBucket: 'rpgbox-82296.appspot.com',
  messagingSenderId: '970692728607',
  appId: '1:970692728607:web:a0de71c0a397c15355822a',
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public fazerLoginFirebase(email: string, senha: string): void {
    autenticacaoFirebase
      .signInWithEmailAndPassword(email, senha)
      .then(() => {
        alert('Usuario ' + email + ' logado com sucesso');
        this.router.navigate(['index']);
      })
      .catch(() => alert('Erro'));
  }

  public criarUsuarioFirebase(email: string, senha: string): void {
    autenticacaoFirebase
      .createUserWithEmailAndPassword(email, senha)
      .then((user) => {
        console.log(`Usuario ${user.user?.email} enviado ao Firebase`);
      })
      .catch((error) => alert(error.message));
  }

  constructor(private router: Router) {}
}

export const autenticacaoFirebase = firebase.auth();
