import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from 'src/enviroments/enviroments';
import { DeleteNinjaUserDTO, ICreateUserNinja, NinjaFilter, NinjaResponsePageable, NinjaUserFormationDTO, NinjasResponsePaginated } from '../interfaces/Ninja.interfaces';
import { Atributo, Filters, ListaBonus } from 'src/app/sets/interfaces/set.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NinjasService {

  private baseUrl:string = enviroments.baseUrl;
  constructor(private http:HttpClient) { }

  getNinjas():Observable<NinjasResponsePaginated>{
    return this.http.get<NinjasResponsePaginated>(`${this.baseUrl}/ninjas`);
  }

  getUserNinjas():Observable<NinjaUserFormationDTO[]>
  {
    const url = `${this.baseUrl}/ninjas/findByUser`;
    const headers = new HttpHeaders().set('Authorization', 
    'Bearer ' + localStorage.getItem('token'));
  
    return this.http.get<NinjaUserFormationDTO[]>(url, {
        headers
    });
  }

  deleteNinjaUser(name:string):Observable<DeleteNinjaUserDTO>{
    const url = `${this.baseUrl}/ninjas/deleteByName/${name}`
    const headers = new HttpHeaders().set('Authorization', 
    'Bearer ' + localStorage.getItem('token'));
    return this.http.delete<DeleteNinjaUserDTO>(url, {
        headers
      });
  }

  calculateNinjaUserFinalBonuses(ninja:ICreateUserNinja):
  Observable<NinjaUserFormationDTO>{
    const url = `${this.baseUrl}/ninjas/calculateNinjaBonuses`;
    const body: ICreateUserNinja = ninja;
    const headers = new HttpHeaders().set('Authorization', 
    'Bearer ' + localStorage.getItem('token'));

    return this.http.post<NinjaUserFormationDTO>(url, body, {
      headers
    });
  }

  createNinjaUser(ninja: ICreateUserNinja): 
  Observable<HttpResponse<NinjaUserFormationDTO>> {
    const url = `${this.baseUrl}/ninjas/create`;
    const body: ICreateUserNinja = ninja;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.post<NinjaUserFormationDTO>(url, body, {
      headers,
      observe: 'response'
    });
  }

  updateNinjaUser(ninja: ICreateUserNinja): 
  Observable<HttpResponse<NinjaUserFormationDTO>> {
    const url = `${this.baseUrl}/ninjas/update`;
    const body: ICreateUserNinja = ninja;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.put<NinjaUserFormationDTO>(url, body, {
      headers,
      observe: 'response'
    });
  }


  getNinjasFilterAnd(filter:NinjaFilter,sorted:boolean,filtred:boolean):
  Observable<NinjaResponsePageable>{
    const url = 
    `${this.baseUrl}/ninjas/filter/and?sorted=${sorted}&filtred=${filtred}`;
    const body: NinjaFilter = filter;
    console.log("voy a hacer llamada" +sorted+" "+filtred)
    console.log(filter)
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.post<NinjaResponsePageable>(url, body, {
      headers
    });
  }

  getNinjasFilterOr(filter:NinjaFilter,sorted:boolean,filtred:boolean):
  Observable<NinjaResponsePageable>{
    const url = 
    `${this.baseUrl}/ninjas/filter/or?sorted=${sorted}&filtred=${filtred}`;
    const body: NinjaFilter = filter;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.post<NinjaResponsePageable>(url, body, {
      headers
    });
  }

}
