import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonagensCampanhaComponent } from './personagens-campanha.component';

describe('PersonagensCampanhaComponent', () => {
  let component: PersonagensCampanhaComponent;
  let fixture: ComponentFixture<PersonagensCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonagensCampanhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonagensCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
