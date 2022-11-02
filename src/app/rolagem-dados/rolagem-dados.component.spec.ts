import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolagemDadosComponent } from './rolagem-dados.component';

describe('RolagemDadosComponent', () => {
  let component: RolagemDadosComponent;
  let fixture: ComponentFixture<RolagemDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolagemDadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolagemDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
