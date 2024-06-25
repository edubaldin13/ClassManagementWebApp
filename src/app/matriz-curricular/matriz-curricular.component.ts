import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from '../services/courses.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { TeacherService } from '../services/teachers.service';

@Component({
  selector: 'app-matriz-curricular',
  templateUrl: './matriz-curricular.component.html',
  styleUrls: ['./matriz-curricular.component.css']
})
export class MatrizCurricularComponent implements OnInit{
  @Input() courseId = '';
  constructor(
    private teacherService: TeacherService,    
    private formBuilder: FormBuilder,
    private ls: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.getTeachers();
    this.getTeachersWithoutCourse();
  }
  teachers: Array<any> = [];
  registeredTeachers: Array<any> = [];
  formMatriz: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    managerId: ['', [Validators.required]],
    classDuration: ['', [Validators.required]],
    classQuantity: ['', [Validators.required]],
    managers: new FormControl<string | null>(null),
  });
  cursosCadastrados: Array<any>  = [];
  async getTeachers(){
    await this.teacherService.get('').then(res =>{
      this.registeredTeachers = res;
    }).catch(err =>{
      console.log(err)
    });
  }
  adicionarAoCurso(courseId: any, teacherId: any){
    debugger
    this.teacherService.put(`/${courseId}/${teacherId}`).then(res => {
      this.getTeachers()
      this.getTeachersWithoutCourse();
      debugger
    }).catch(err => {
      console.log('erro', err)
    });
  }
  DesvincularCurso(teacherId: any){

  };
  async getTeachersWithoutCourse(){
    await this.teacherService.get('/no-course').then(res =>{
      this.teachers = res;
    }).catch(err =>{
      console.log(err)
    });
  }
}
