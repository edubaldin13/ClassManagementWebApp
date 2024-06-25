import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-ativacao-cadastros',
  templateUrl: './ativacao-cadastros.component.html',
  styleUrls: ['./ativacao-cadastros.component.css']
})
export class AtivacaoCadastrosComponent implements OnInit{
  constructor(
    private registerService: RegisterService
  ){}
  registers: Array<any>;
  ngOnInit(): void {
    this.getRegisters();
  }
  private mapRoleParaPT(roles : any): Array<any>{
    roles.forEach((role: { role: string; }) => {
          role.role = (role.role =="Manager" ? "Coordenador" : "Professor") 
    });
    return roles;
  }
  AtivarCadastro(id:any){
    this.registerService.put(`/${id}`).then(
      res => {
        debugger
        this.getRegisters();
      }
    ).catch(
      err => {
        debugger
      }
    )
  }
  getRegisters(){
    this.registerService.get().then(res => {
      this.registers = this.mapRoleParaPT(res);
    });
  }
}
