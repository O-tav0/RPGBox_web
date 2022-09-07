import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-combates-campanha',
  templateUrl: './combates-campanha.component.html',
  styleUrls: ['./combates-campanha.component.css']
})
export class CombatesCampanhaComponent implements OnInit {

  public list1: any[];

  public adicionarPersonagem(teste: any): void {
    console.log(this.list1)
    console.log(this.list1.indexOf('teste 1'))
  }

  constructor() { }

  ngOnInit(): void {
    this.list1 = ['teste 1', 'teste 2', 'teste 3'];
  } 

}
