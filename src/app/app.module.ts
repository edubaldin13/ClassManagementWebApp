import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { TableModule } from 'primeng/table'; // Import TableModule

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CadastroCursosComponent,
    MatrizCurricularComponent,
    CadastroHorariosProfessorComponent,
    BotaoVoltarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    TableModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
