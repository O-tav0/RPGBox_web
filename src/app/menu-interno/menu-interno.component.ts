import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../service/Firebase.service';

@Component({
  selector: 'menu-interno',
  templateUrl: './menu-interno.component.html',
  styleUrls: ['./menu-interno.component.css'],
})
export class MenuInternoComponent implements OnInit {
  public deslogarUsuario(): void {
    this.firebaseService.deslogarUsuario();
  }

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {}
}
