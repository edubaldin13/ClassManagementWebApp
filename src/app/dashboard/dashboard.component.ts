import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
DispHorarios() {
  this.router.navigate(['horarios-professor'])
}
MatrizCurricular() {
  this.router.navigate(['matriz-curricular'])
}
CadastroCursos() {
  this.router.navigate(['cadastro-cursos'])
}
  name: string;
  constructor( private ls:LocalStorageService
             , private router: Router
  ){
    this.name = JSON.parse(localStorage.getItem("credentials")).unique_name;
  }
}
