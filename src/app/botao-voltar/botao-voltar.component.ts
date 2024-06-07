import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botao-voltar',
  templateUrl: './botao-voltar.component.html',
  styleUrls: ['./botao-voltar.component.css']
})
export class BotaoVoltarComponent {
  constructor(private router: Router){
  }
  Voltar(){
    this.router.navigate([""]);
  }
}
