import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard, AuthGuardChild } from './services/guards/auth-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  
{
  path: 'login', component: LoginComponent
},
{
  path: '', component: AppComponent,canActivate: [AuthGuard], canActivateChild: [AuthGuardChild],
  children: [
    { path: 'dashboard', component: DashboardComponent}
  ]
}
];
// const routes: Routes = [
// {
//   path: '', component: LoginComponent
// }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
