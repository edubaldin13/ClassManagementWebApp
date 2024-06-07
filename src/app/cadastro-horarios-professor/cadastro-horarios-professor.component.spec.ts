import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroHorariosProfessorComponent } from './cadastro-horarios-professor.component';

describe('CadastroHorariosProfessorComponent', () => {
  let component: CadastroHorariosProfessorComponent;
  let fixture: ComponentFixture<CadastroHorariosProfessorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroHorariosProfessorComponent]
    });
    fixture = TestBed.createComponent(CadastroHorariosProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
