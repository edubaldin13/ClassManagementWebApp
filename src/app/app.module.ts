import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroCursosComponent } from './cadastro-cursos/cadastro-cursos.component';
import { MatrizCurricularComponent } from './matriz-curricular/matriz-curricular.component';
import { CadastroHorariosProfessorComponent } from './cadastro-horarios-professor/cadastro-horarios-professor.component';
import { BotaoVoltarComponent } from './botao-voltar/botao-voltar.component';
import { MultiSelectModule } from 'primeng/multiselect';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { TableModule } from 'primeng/table';
import { RegistroComponent } from './registro/registro.component'; // Import TableModule
import { DropdownModule } from 'primeng/dropdown';
import { AtivacaoCadastrosComponent } from './ativacao-cadastros/ativacao-cadastros.component';
import { ButtonModule } from 'primeng/button';
import { ToastrModule } from 'ngx-toastr';
import { BotaoAdicionaComponent } from './matriz-curricular/botao-adiciona-prof-curso/botao-adiciona-prof-curso';
import { ModalAdicionarComponent } from './matriz-curricular/modal-adicionar/modal-adicionar';
import { AdicionarMateriaCursoComponent } from './matriz-curricular/adicionar-materia-curso/adicionar-materia-curso';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CadastroCursosComponent,
    MatrizCurricularComponent,
    CadastroHorariosProfessorComponent,
    BotaoVoltarComponent,
    RegistroComponent,
    AtivacaoCadastrosComponent,
    BotaoAdicionaComponent,
    ModalAdicionarComponent,
    AdicionarMateriaCursoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    ToastrModule.forRoot()
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService, provideAnimations(), provideToastr()],
  bootstrap: [AppComponent]
})
export class AppModule { }
