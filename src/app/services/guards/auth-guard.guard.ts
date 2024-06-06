import {
    ActivatedRouteSnapshot,
    CanActivateChildFn,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
    UrlTree,
  } from "@angular/router";
  import { JwtHelperService } from "@auth0/angular-jwt";
  import { LocalStorageService } from "../local-storage.service";
  import { inject } from "@angular/core";
import { AuthService } from "../auth.service";
  
  export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<UrlTree | boolean> => {
    const jwtHelper = new JwtHelperService();
    const authenticationService = new AuthService(jwtHelper);
    const router = inject(Router)
    return authenticationService.isAuthenticated().then((result) => {
      if(result){
        return true;
      }
      const ls = new LocalStorageService();
      ls.clearData();
      return router.navigateByUrl('/login').then(() => false);
    }).catch((err) => {
      return false;
    });
  };
  
  export const AuthGuardChild: CanActivateChildFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<UrlTree | boolean> => {
    const jwtHelper = new JwtHelperService();
    const authenticationService = new AuthService(jwtHelper);
    const router = inject(Router)
    return authenticationService.isAuthenticated().then((result) => {
      if(result){
        return true;
      }
      const ls = new LocalStorageService();
      ls.clearData();
      return router.navigateByUrl('/login').then(() => false);
    }).catch((err) => {
      return false;
    });
  };
  