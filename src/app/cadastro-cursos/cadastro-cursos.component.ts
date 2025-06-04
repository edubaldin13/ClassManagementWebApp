import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/courses.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../services/local-storage.service';
import { ManagerService } from '../services/manager.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GraduationCourse } from 'src/assets/interfaces/GraduationCourse';

@Component({
  selector: 'app-cadastro-cursos',
  templateUrl: './cadastro-cursos.component.html',
  styleUrls: ['./cadastro-cursos.component.css'],
})
export class CadastroCursosComponent implements OnInit {
  async excluir(courseId: any) {
    ;
    await this.courseService
      .delete(`/${courseId}`)
      .then((res) => {
        ;
        this.updateCourseList();
      })
      .catch((err) => {
        ;
        console.log(err);
      });
  }
  constructor(
    private courseService: CourseService,
    private managerService: ManagerService,
    private formBuilder: FormBuilder,
    private ls: LocalStorageService,
    private router: Router,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.updateCourseList();
    this.updateManagerList();
  }
  managers: Array<any> = [];
  formCursos: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    managerId: ['', [Validators.required]],
    classDuration: ['', [Validators.required]],
    classStart: ['', [Validators.required]],
    classEnd: ['', [Validators.required]],
    classQuantity: ['', [Validators.required]],
    managers: new FormControl<string | null>(null),
  });
  cursosCadastrados: Array<any> = [];
  novoCurso() {
    
    var novoCurso: GraduationCourse = {
      name: this.formCursos.get('name').value,
      managerId: this.formCursos.get('managerId').value[0],
      classDuration: this.formCursos.get('classDuration').value,
      classStart: this.formCursos.get('classStart').value,
      classEnd: this.formCursos.get('classEnd').value,
    };
    this.courseService
      .post('', novoCurso)
      .then((res) => {
        this.toast.success('Curso cadastrado com sucesso!');
        this.formCursos.reset();
        this.updateCourseList();
      })
      .catch((err) => {
        this.toast.error('Erro ao cadastrar curso!');
        console.log(err);
      });
  }
  async updateCourseList() {
    await this.courseService.get().then((res) => {
      this.cursosCadastrados = res;
    });
    console.log(this.cursosCadastrados);
  }
  async updateManagerList() {
    await this.managerService.get().then((res) => {
      this.managers = res;
    });
    console.log(this.managers);
  }
  editarMatriz(courseId: any) {
    this.router.navigate([`matriz-curricular/${courseId}`]);
  }
}
