import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrenciarCombateComponent } from './genrenciar-combate.component';

describe('GenrenciarCombateComponent', () => {
  let component: GenrenciarCombateComponent;
  let fixture: ComponentFixture<GenrenciarCombateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenrenciarCombateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenrenciarCombateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
