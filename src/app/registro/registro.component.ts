import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private router: Router
  ){}
  cargos: Array<any> = [
    {
      Name: 'Professor',

    },
    {
      Name: 'Coordenador',

    },
  ]
  cargoSelecionado: any;
  formRegistro: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    name: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    cargo: ['', [Validators.required]]
  });
registrar(){
  
  this.formRegistro.valid
  var cargo = this.formRegistro.get('cargo').value;
  const registro: any = {
    name : this.formRegistro.get('name').value,
    email : this.formRegistro.get('email').value,
    password : this.formRegistro.get('password').value,
    cpf : this.formRegistro.get('cpf').value,
    role : cargo.Name,
  }
  this.registerService.post('',registro).then(res =>{
    
    this.formRegistro.reset(true)
  }).catch(err => {
    
  });
} 
}
