import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ativacao-cadastros',
  templateUrl: './ativacao-cadastros.component.html',
  styleUrls: ['./ativacao-cadastros.component.css']
})
export class AtivacaoCadastrosComponent implements OnInit{
  constructor(
    private toast: ToastrService,
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

  updateCourseName(event: Event, register: any): void {
    const inputElement = event.target as HTMLInputElement;
    register.courseName = inputElement.value;
}


  AtivarCadastro(id:number, course: string, role: string){
    
    if(role === "Professor" && course === ""){
      this.toast.error("Cadastro de Professor não pode ser ativado pois näo possui curso associado");
      return
    }
    this.registerService.put(`/${id}`).then(
      res => {
        
        this.getRegisters();
      }
    ).catch(
      err => {
        
      }
    )
  }
  getRegisters(){
    this.registerService.get().then(res => {
      this.registers = this.mapRoleParaPT(res);
    });
  }
}
