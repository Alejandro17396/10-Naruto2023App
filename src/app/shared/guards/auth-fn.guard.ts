import { inject } from "@angular/core";
import { CanActivateFn, CanLoadFn, Router, UrlTree } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth-service.service";


export const authGuardFn: CanActivateFn = () =>{
    const authService = inject(AuthService);
    const routerService = inject(Router);

    const token = authService.isLoggedIn();
    if(!token){
        routerService.navigate(['/auth/login']);
        return false;
    }

    return true;
}

export const authGuardLoadFn: CanLoadFn = (route, segments): boolean | UrlTree => {
    const authService = inject(AuthService);
    if (!authService.isLoggedIn()) {
      return false;
    }
    return true;
  };

export const authGuardAdminFn: CanActivateFn = () =>{
    const authService = inject(AuthService);
    const routerService = inject(Router);

    const token = authService.isLoggedIn();
    if(!token){
        routerService.navigate(['/auth/login']);
        return false;
    }

    const admin = authService.isAdmin();

    if(!admin){
        return false;
    }

    return true;
}