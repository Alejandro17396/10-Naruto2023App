import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
 // constructor(private authService: AuthService, private router: Router) {}

  /*canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const isLogged = this.authService.isLoggedIn();
    if (!isLogged) {
      this.router.navigate(['/login']);
    }
    return isLogged;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isLogged = this.authService.isLoggedIn();
    if (!isLogged) {
      this.router.navigate(['/login']);
    }
    return isLogged;
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }*/

  constructor(private authService: AuthService, private router: Router) { }

  /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return () => this.checkLogin(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return () => this.checkLogin(segments.join('/'));
  }

  checkLogin(url: string): boolean | UrlTree {
    if (this.authService.isLoggedIn) { return true; }

    this.authService.redirectUrl = url;

    return this.router.parseUrl('/login');
  }*/
  
}
