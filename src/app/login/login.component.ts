import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

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
    private router: Router
  ){}
  formLogin: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
  login(){
    if(this.formLogin.get('email') && this.formLogin.get('password')){
      this.authenticationService.post('/login', {email: this.formLogin.get('email').value, password: this.formLogin.get('password').value})
      .then((res)=>{
        this.saveToken(res.token);
        this.router.navigate(['/dashboard'])
      })
      .catch((err) => {
        console.log('Erro ao logar', err);
      })
    }
  }
  saveToken(token: string){
    this.ls.saveData("token", token);
    this.ls.saveData("credentials", this.jwtHelper.decodeToken(token));
  }
}
