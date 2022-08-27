import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoCampanhaComponent } from './historico-campanha.component';

describe('HistoricoCampanhaComponent', () => {
  let component: HistoricoCampanhaComponent;
  let fixture: ComponentFixture<HistoricoCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoCampanhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
