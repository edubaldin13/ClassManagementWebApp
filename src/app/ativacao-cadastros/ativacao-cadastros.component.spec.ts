import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivacaoCadastrosComponent } from './ativacao-cadastros.component';

describe('AtivacaoCadastrosComponent', () => {
  let component: AtivacaoCadastrosComponent;
  let fixture: ComponentFixture<AtivacaoCadastrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtivacaoCadastrosComponent]
    });
    fixture = TestBed.createComponent(AtivacaoCadastrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
