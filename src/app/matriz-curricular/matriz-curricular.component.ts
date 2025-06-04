import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../services/courses.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { TeacherService } from '../services/teachers.service';
import { ToastrService } from 'ngx-toastr';
import { GraduationCourse } from 'src/assets/interfaces/GraduationCourse';
import { ClassTime } from 'src/assets/interfaces/ClassTime';
import { TeacherIdDayEnum } from 'src/assets/enums/TeacherIdDayEnum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matriz-curricular',
  template: `<div class="flex justify-center cor">
    <div class="flex flex-column w-full col-8 p-2">
      <div class="flex flex-column justify-center align-items-center">
        <div class="flex align-items-center justify-center">
          <h3 class="mr-4">Cadastro de cursos</h3>
          <app-botao-voltar></app-botao-voltar>
        </div>
        {{ this.graduationCourse.name }}
        <h3>Matriz Curricular</h3>
        <div>
          <div class="flex flex-row p-3" *ngIf="graduationCourse">
            <div
              class="p-4 bg-white flex flex-column align-middle"
              *ngFor="
                let day of [
                  'Segunda-feira',
                  'Terça-feira',
                  'Quarta-feira',
                  'Quinta-feira',
                  'Sexta-feira',
                  'Sábado'
                ]
              "
            >
              <h4 class="font-bold">{{ day }}</h4>
              <div
                class="flex flex-row"
                *ngIf="handleValidIfShowAddButonClassSubject(getDayEnum(day))"
              >
                <button
                  class="text-sm wrap-break-word mr-2"
                  (click)="handleAddSubject(1, null, getDayEnum(day))"
                  *ngIf="true"
                >
                  Adicionar Materia para todos
                </button>
              </div>
              <div
                class="flex flex-row"
                *ngIf="handleValidIfShowAddButtonTeacher(getDayEnum(day))"
                >
                <!-- *ngIf="handleValidIfShowAddButonClassSubject(getDayEnum(day))" -->
                <button
                  class="text-sm wrap-break-word mr-2"
                  (click)="handleAddSubject(0, null, getDayEnum(day))"
                  *ngIf="true"
                >
                  Adicionar Professor para todos
                </button>
              </div>
              <div
                class="my-4"
                *ngFor="let classTime of getClassTimesByDay(getDayEnum(day))"
              >
                <span class="text-lg font-semibold"
                  >{{ classTime.start | date : 'shortTime' }} -
                  {{ classTime.end | date : 'shortTime' }}</span
                >
                <span *ngIf="classTime.classSubject != null">{{
                  classTime.classSubject.name
                }}</span>
                <button *ngIf="classTime.classSubject == null">
                  Sem disciplina
                </button>
                <app-botao-adiciona
                  class="flex"
                  [teacher]="classTime.teacher"
                ></app-botao-adiciona>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <dialog #modal class="absolute w-full h-full m-0 left-1/2 top-1/2 transform"> -->
    <!-- </dialog> -->
  </div>`,
  styleUrls: ['./matriz-curricular.component.css'],
})
export class MatrizCurricularComponent implements OnInit {
  showModal = false;
  modalSubjects: string[] = [];
  @Input() courseId = '';
  constructor(
    private teacherService: TeacherService,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private ls: LocalStorageService,
    private toast: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadMethods();
  }
  teachers: Array<any> = [];
  graduationCourse: GraduationCourse;
  registeredTeachers: Array<any> = [];
  classTime: ClassTime;
  formMatriz: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    managerId: ['', [Validators.required]],
    classDuration: ['', [Validators.required]],
    classQuantity: ['', [Validators.required]],
    managers: new FormControl<string | null>(null),
  });

  async loadMethods() {
    await this.getGraduationCourse();
    this.getTeachersWithoutCourse();
  }
  cursosCadastrados: Array<any> = [];
  async getGraduationCourse() {
    await this.courseService
      .get(`/${this.courseId}`)
      .then((res: GraduationCourse) => {
        this.graduationCourse = res;
        console.log(this.graduationCourse);
      })
      .catch((err) => {
        this.toast.error('Erro ao carregar curso', 'Erro');
      });
  }
  adicionarAoCurso(courseId: any, teacherId: any) {
    this.teacherService
      .put(`/${courseId}/${teacherId}`)
      .then((res) => {
        this.toast.success(
          'Professor vinculado ao curso com sucesso',
          'Sucesso'
        );
        this.getTeachersWithoutCourse();
      })
      .catch((err) => {
        this.toast.error('Erro ao vincular professor ao curso', 'Erro');
        console.log('erro', err);
      });
  }
  DesvincularCurso(teacherId: any) {}
  async getTeachersWithoutCourse() {
    await this.teacherService
      .get('/no-course')
      .then((res) => {
        this.teachers = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getDayEnum(day: string): number {
    const dayEnum: { [key: string]: number } = {
      Domingo: TeacherIdDayEnum.Sunday,
      'Segunda-feira': TeacherIdDayEnum.Monday,
      'Terça-feira': TeacherIdDayEnum.Tuesday,
      'Quarta-feira': TeacherIdDayEnum.Wednesday,
      'Quinta-feira': TeacherIdDayEnum.Thursday,
      'Sexta-feira': TeacherIdDayEnum.Friday,
      Sábado: TeacherIdDayEnum.Saturday,
    };
    return dayEnum[day] || -1;
  }

  getClassTimesByDay(day: TeacherIdDayEnum): ClassTime[] {
    if (!this.graduationCourse || !this.graduationCourse.classTimes) return [];
    var list = this.graduationCourse.classTimes.filter(
      (classTime) => classTime.teacherIdDay === day
    );
    return list;
  }

  handleAddSubject(
    addType: number,
    horarioId?: number,
    day?: TeacherIdDayEnum
  ) {
    // matriz-curricular/:courseId/adicionar/:horarioId/:addType
    this.router.navigate([
      `matriz-curricular/${this.graduationCourse.graduationCourseId}/horarios/adicionar/${day}/${addType}`,
    ]);
  }

  handleValidIfShowAddButonClassSubject(teacherIdDay: number): boolean {
    var total = this.graduationCourse.classTimes.filter(
      (classTime) => classTime.teacherIdDay === teacherIdDay
    );

    var totalWithoutCourse = this.graduationCourse.classTimes.filter(
      (classTime) =>
        classTime.teacherIdDay === teacherIdDay &&
        classTime.classSubject == null
    );

    if (total.length == totalWithoutCourse.length) return true;

    return false;
  }

  handleValidIfShowAddButtonTeacher(teacherIdDay: number): boolean {
    var total = this.graduationCourse.classTimes.filter(
      (classTime) => classTime.teacherIdDay === teacherIdDay
    );

    var totalWithoutCourse = this.graduationCourse.classTimes.filter(
      (classTime) =>
        classTime.teacherIdDay === teacherIdDay &&
        classTime.teacher == null
    );

    if (total.length == totalWithoutCourse.length) return true;

    return false;
  }
}
