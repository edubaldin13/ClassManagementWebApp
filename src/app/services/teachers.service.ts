import { Injectable } from '@angular/core';
import { GenericFetchService } from './generic-fetch.service';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class TeacherService extends GenericFetchService<any>  {
  constructor(ls: LocalStorageService) {
    super(ls);
    this.setContextUrl('/teacher');
  }
}