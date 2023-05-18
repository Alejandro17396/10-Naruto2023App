import { Injectable } from '@angular/core';
import { Observable, of, tap, catchError, map } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Login, Register, ResgisterResponse } from '../interfaces/login.interface';
import { enviroments } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = enviroments.baseUrl;
  private _login?: Login;
  constructor(private http:HttpClient) { }


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

    prueba():Observable<any>{
        return this.http.get<any>('http://localhost:8888/sets')
        .pipe(
           
        );
    }

}
