import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  public saveData(key: string, value: any) {
    //metodo para salvar dados no local storage
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    let value: any = localStorage.getItem(key);
    return JSON.parse(value);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
