import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ClassSubject } from 'src/assets/interfaces/ClassSubject';
import { Teacher } from 'src/assets/interfaces/Teacher';
import { ModalAdicionarComponent } from '../modal-adicionar/modal-adicionar';
import { ClassTime } from 'src/assets/interfaces/ClassTime';
import { Router } from '@angular/router';

@Component({
    selector: 'app-botao-adiciona',
    template: `
    <div>
        <div class="py-2">
            <button *ngIf="!teacher" (click)="handleClick(12)">
                Adicionar Professor
            </button>
            <span *ngIf="teacher">
                {{ teacher.name }}
            </span>
        </div>
    </div>
    `,
    styleUrls: ['botao-adiciona-prof-curso.css']
})
export class BotaoAdicionaComponent implements OnInit {
    @Input() classTime : ClassTime
    @Input() teacher: Teacher | null = null;
    mostraBotao: Boolean = false
    constructor( private router: Router){
        
    }

    ngOnInit(): void {
        if (this.teacher != null) {
            console.log(`Teacher initialized: ${this.teacher.name}`);
        }
    }
    handleClick(courseId: number): void {
        
        this.router.navigate([`matriz-curricular/:courseId/adicionar`])
        this.mostraBotao = true; // Ensure the div is shown when the button is clicked
    }
}
