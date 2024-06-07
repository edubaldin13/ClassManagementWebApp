import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericFetchService<TResult> {
  private _baseUrl = 'http://localhost:5000/api';
  private _contextUrl = '';
  constructor(private ls: LocalStorageService) { }
  public setBaseUrl(value: string) {
    this._baseUrl = value;
  }
  protected setContextUrl(value: string) {
    this._contextUrl = value;
  }
  private async fetchOperation(fetchUrl: string, requestOptions: RequestInit): Promise<any> {
    return await fetch(fetchUrl, requestOptions)
        .then(r => {
          if (r.ok) {
            return r.json()
          }
          throw r;
        }).then(response => {
          return response;
        })
        .catch((err) => {
          console.log(err)
          throw err;
        });
  }
  get(url?: string, data?: Record<string,string>): Promise<any> {
    const headers = { 'Authorization': `Bearer ${this.ls.getData('token')}` }; 
    const requestOptions: RequestInit = {
      headers: headers,
      method: 'GET'
    };
    const fetchUrl = `${this._baseUrl}${this._contextUrl}${(url ? url : '')}${data ? ('?' + new URLSearchParams(data).toString()) : ''}`;
    return this.fetchOperation(fetchUrl, requestOptions);
  }
  post(url?: string, data?: any ): Promise<any> {
    
    const headers = { 
      'Authorization': `Bearer ${this.ls.getData('token')}` ,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }; 
    const requestOptions: RequestInit = {
      headers: headers,
      method: 'POST',
      body: data ? JSON.stringify(data) : null
    };
    const fetchUrl = `${this._baseUrl}${this._contextUrl}${(url ? url : '')}`;
    return this.fetchOperation(fetchUrl, requestOptions);
  }
  put(url?: string, data?: any ): Promise<any> {
    const headers = { 
      'Authorization': `Bearer ${this.ls.getData('token')}` ,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }; 
    const requestOptions: RequestInit = {
      headers: headers,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : null
    };
    const fetchUrl = `${this._baseUrl}${this._contextUrl}${(url ? url : '')}`;
    return this.fetchOperation(fetchUrl, requestOptions);
  }
  delete(url?: string): Promise<any>{
    const headers = {
      'Authorization': `Bearer ${this.ls.getData('token')}` ,
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    };
    const requestOptions: RequestInit = {
      headers: headers,
      method: 'DELETE',
      body: null
    };
    const fetchUrl = `${this._baseUrl}${this._contextUrl}${(url ? url : '')}`;
    return this.fetchOperation(fetchUrl, requestOptions)
  }
  getById(url: string, id:any, data?: Record<string,string>): Promise<any> {
    const requestOptions: RequestInit = {
      body: JSON.stringify(data),
      method: 'GET'
    };
    return this.fetchOperation(`${this._baseUrl}/${this._contextUrl}${(url ? url : '')}/${id}${data ? ('?' + new URLSearchParams(data).toString()) : ''}`, requestOptions);
  }
}
