import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatesCampanhaComponent } from './combates-campanha.component';

describe('CombatesCampanhaComponent', () => {
  let component: CombatesCampanhaComponent;
  let fixture: ComponentFixture<CombatesCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombatesCampanhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatesCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
