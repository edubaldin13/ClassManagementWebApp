import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CourseService } from 'src/app/services/courses.service';
import { ClassSubject } from 'src/assets/interfaces/ClassSubject';
import { GetCourseDataByGraduationCourseIdRequest } from 'src/assets/interfaces/GraduationCourse';
import { Teacher } from 'src/assets/interfaces/Teacher';
import PostClassSubjectOrTeacherRequest  from 'src/assets/interfaces/PostClassSubjectTeacher';


import { TeacherIdDayEnum, TeacherIdDayEnumPortuguese } from 'src/assets/enums/TeacherIdDayEnum';
@Component({
    selector: 'app-modal-adicionar',
    template: `<div class="flex justify-center cor">
    <div class="flex flex-column w-full col-8 p-2">
      <div class="flex flex-column justify-center align-items-center">
        <div class="flex align-items-center justify-center">
          <h3 class="mr-4">Cadastro de cursos</h3>
          <app-botao-voltar></app-botao-voltar>
        </div>
            adicionar nome do curso
            <h3>Matriz Curricular</h3>
            <div>
            Dia da semana {{this.returnDayAsString()}}
            </div>
        <div>
          <div *ngFor="let professor of professores">
            <div class="">
              <span class="text-lg font-semibold">Nome do professor</span>
              {{professor.name}}
              <button (click)="handleUpdateClassSubject(null, professor.teacherId)">Adicionar matéria</button>

            </div>
          </div>
          <div *ngIf="materias != null">
            <div *ngFor="let materia of materias">
              <div>
                <span class="text-lg font-semibold">Nome da matéria</span>
                {{materia.name}}
                <button (click)="handleUpdateClassSubject(materia.classSubjectId, null)">Adicionar matéria</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
})
export class ModalAdicionarComponent implements OnInit{
    @Input() courseId = '';
    @Input() horarioId? = '';
    @Input() teacherDayId = '';
    @Input() addType? = ''; //materia ou professor
    professores: Array<Teacher> 
    materias: Array<ClassSubject>

    constructor(private courseService: CourseService,) {}
    ngOnInit(): void {
        this.handleLoadAddInfo();
    }

    async handleLoadAddInfo(){
      console.log('courseId', this.courseId);
      console.log('horarioId', this.horarioId);
      console.log('teacherDayId', this.teacherDayId);
      console.log('addType', this.addType);
      //podemos utilizar o mesmo método abaixo para o horario do professor em especifico
      //adicionando o campo do horarioid
        await this.courseService.get(`/${this.courseId}/horarios/adicionar/${this.teacherDayId}/${this.addType}`)
        .then((res: GetCourseDataByGraduationCourseIdRequest) => {
          this.materias = res.classSubjects
          this.professores = res.teachers
          //#TODO ESTA RETORNANDO CERTINHO O CLASSSUBJECT, LISTAR ESSES CARAS E DEPOIS REPLICAR OS COMPORTAMENTOS 
          //PARA AQUELES COM HORARIO ID
        })
        .catch((err) => {})
    }
     returnDayAsString(){
      return TeacherIdDayEnumPortuguese[parseInt(this.teacherDayId)]
    }

    async handleUpdateClassSubject(classSubjectId: number | null, teacherId: number | null ,hourId?: number){
      const request: PostClassSubjectOrTeacherRequest = {
        graduationCourseId: parseInt(this.courseId),
        teacherDayId: parseInt(this.teacherDayId),
        classSubjectId,
        teacherId
      };

    await this.courseService.post(`/${this.courseId}/adicionar/${this.teacherDayId}`, request)
    .then((res: any) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log
    })
  }
}