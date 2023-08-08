import { Injectable } from '@angular/core';
import { Observable, of, tap, catchError, map } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Login, Register, ResgisterResponse } from '../interfaces/login.interface';
import { enviroments } from 'src/enviroments/enviroments';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Authority, Roles } from 'src/app/shared/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = enviroments.baseUrl;
  private _login?: Login;
  constructor(private http:HttpClient,public jwtHelper: JwtHelperService) { }


  login(username:string, password:string):Observable <Login>{
    const body = {
        username:username,
        password:password
    };
    return this.http.post<Login>(`${this.baseUrl}/login`,body)
           .pipe(
               tap(login => this._login = login),
               tap(user => localStorage.setItem('token', user.token.toString()))
           );
   }

   logout(){
    this._login=undefined;
    localStorage.clear();
   }

   register(data:Register):Observable <ResgisterResponse>{
 
    if(!data.password || !data.mail || !data.username){
        var response :ResgisterResponse = {mensaje:"Fallo al crear la cuenta"}
        return of(response);
    }
    return this.http.post<ResgisterResponse>(`${this.baseUrl}/users/create`,data);
   }

   checkAuthentication():Observable<boolean>{
    if( !localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<Login>(`${this.baseUrl}/login`)
        .pipe(
            tap(login => this._login = login),
            tap(login => this._login = login),
            map(login => !!login),
            catchError(err => of(false))
        );

    return of(true);
    }

    public isLoggedIn(): boolean {
        const token = localStorage.getItem('token'); // Asume que el token se almacena en localStorage
    
        // Comprueba si el token es válido y no ha expirado
        if (token && !this.jwtHelper.isTokenExpired(token)) {
          return true;
        } else {
          return false;
        }
      }

    public isAdmin():boolean{
      console.log("admin")
      console.log(this.getUserRoles());
      let roles : Authority [] = JSON.parse(this.getUserRoles().toString());
      let admin:boolean = false;
      roles.forEach(rol  =>{
        if(rol.authority === Roles.Admin){
          admin = true;
        }
      });
      if(admin){
        return true;
      }
      return false;
    }

    getToken():string | null{
      const token = localStorage.getItem('token');
      return token;
    }

    getUserRoles(): string[] {
      const token = this.getToken();
      if(token){
        const decodedToken = this.jwtHelper.decodeToken(token);
        const authorities = decodedToken.authorities;
    
        if (authorities ) {
          return authorities;
        } 
      }
      return [];
    }
}
