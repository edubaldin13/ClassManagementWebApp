import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private ls: LocalStorageService,
    private authenticationService: AuthenticationService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private toast: ToastrService
  ){}
  formLogin: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
  login(){
    if(this.formLogin.get('email') && this.formLogin.get('password')){
      this.authenticationService.post('/login', {email: this.formLogin.get('email').value, password: this.formLogin.get('password').value})
      .then((res)=>{
        this.toast.success('Login realizado com sucesso', 'Sucesso');
        this.saveToken(res.token);
        this.router.navigate(['/dashboard'])
      })
      .catch((err) => {
        this.toast.error('Credenciais incorretas', 'Erro');
        console.log('Erro ao logar', err);
      })
    }
  }
  saveToken(token: string){
    this.ls.saveData("token", token);
    this.ls.saveData("credentials", this.jwtHelper.decodeToken(token));
  }
  registrar(){
    this.router.navigate(['registrar'])
  }
}
