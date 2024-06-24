import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard, AuthGuardChild } from './services/guards/auth-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { CadastroCursosComponent } from './cadastro-cursos/cadastro-cursos.component';
import { MatrizCurricularComponent } from './matriz-curricular/matriz-curricular.component';
import { CadastroHorariosProfessorComponent } from './cadastro-horarios-professor/cadastro-horarios-professor.component';
import { RegistroComponent } from './registro/registro.component';
import { AtivacaoCadastrosComponent } from './ativacao-cadastros/ativacao-cadastros.component';

const routes: Routes = [
  
{
  path: 'login', component: LoginComponent
},
{
  path: '', component: AppComponent,canActivate: [AuthGuard], canActivateChild: [AuthGuardChild],
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'cadastro-cursos', component: CadastroCursosComponent},
    { path: 'matriz-curricular/:courseId', component: MatrizCurricularComponent},
    { path: 'horarios-professor', component: CadastroHorariosProfessorComponent},
    { path: 'ativacao-cadastros', component: AtivacaoCadastrosComponent}
  ]
},
{
  path: 'registrar', component: RegistroComponent
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
