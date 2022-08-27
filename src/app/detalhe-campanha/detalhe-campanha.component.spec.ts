import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheCampanhaComponent } from './detalhe-campanha.component';

describe('DetalheCampanhaComponent', () => {
  let component: DetalheCampanhaComponent;
  let fixture: ComponentFixture<DetalheCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheCampanhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
