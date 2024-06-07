import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCursosComponent } from './cadastro-cursos.component';

describe('CadastroCursosComponent', () => {
  let component: CadastroCursosComponent;
  let fixture: ComponentFixture<CadastroCursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroCursosComponent]
    });
    fixture = TestBed.createComponent(CadastroCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
