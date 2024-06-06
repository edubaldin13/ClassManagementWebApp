import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService{
    constructor(private jwtHelper: JwtHelperService){}
    public isAuthenticated(): Promise<boolean>{
        return new Promise((resolve)=>{
            const token = localStorage.getItem('token');
            resolve(!this.jwtHelper.isTokenExpired(token));
        })
    }
}
