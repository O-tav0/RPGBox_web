import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotacoesCampanhaComponent } from './anotacoes-campanha.component';

describe('AnotacoesCampanhaComponent', () => {
  let component: AnotacoesCampanhaComponent;
  let fixture: ComponentFixture<AnotacoesCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnotacoesCampanhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotacoesCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
