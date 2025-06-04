import { Component, Input } from '@angular/core';
import { ClassSubject } from 'src/assets/interfaces/ClassSubject';
import { GraduationCourse } from 'src/assets/interfaces/GraduationCourse';

@Component({
    selector: 'app-adicionar-materia-curso',
    template: `
    <div>
        <div class="flex w-full h-full ">
                <div>
                  <h5> Titulo do Modal </h5>
                  <ul>
                    <!-- <li *ngFor="let subject of modalSubjects">{{ subject }}</li>k -->
                  </ul>
                  <button (click)="openPopupAdd()">Fechar</button>
                </div>
              </div>
    </div>
    `,
})
export class AdicionarMateriaCursoComponent {
    @Input() openPopupAdd!: () => void;
    @Input() curso: GraduationCourse
    constructor() {}
}