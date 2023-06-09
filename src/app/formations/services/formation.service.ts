import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NinjaFilter, NinjaUserFormationDTO } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { CompareFormations, DeleteUserFormationDTO, FormationElement, FormationResponsePaginated, ICreateFormation, UserFormationDTO } from '../interfaces/formations.interface';
import { Observable } from 'rxjs';
import { enviroments } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private baseUrl:string = enviroments.baseUrl;
  constructor(private http:HttpClient){

  }

  getUserFormations():Observable<UserFormationDTO[]>
  {
    const url = `${this.baseUrl}/formation/findByUser`;
    const headers = new HttpHeaders().set('Authorization', 
    'Bearer ' + localStorage.getItem('token'));
  
    return this.http.get<UserFormationDTO[]>(url, {
        headers
    });
  }

  createFormation(filter:NinjaFilter,sorted:boolean,filtred:boolean):
  Observable<FormationResponsePaginated>{
    const url = 
    `${this.baseUrl}/ninjas/createComboFormations?sorted=${sorted}&filtred=${filtred}`;
    const body: NinjaFilter = filter;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.post<FormationResponsePaginated>(url, body, {
      headers
    });
  }

  createFormationByNinjas(filter:Map<string,string>):
  Observable<FormationElement>{
    const url = `${this.baseUrl}/ninjas/createFormation`;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    .set('Content-Type', 'application/json');
    const requestBody = JSON.stringify(Object.fromEntries(filter.entries())); // Convertir a objeto JavaScript
    return this.http.post<FormationElement>(url, requestBody, {
      headers
    });
  }

  compareFormations(formations:CompareFormations,skill:boolean):
  Observable<CompareFormations>{
    const url = 
    `${this.baseUrl}/formation/compareFormations?skill=${skill}`;
    const body: CompareFormations = formations;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.post<CompareFormations>(url, body, {
      headers
    });
  }

  deleteUserFormation(name:string):Observable<DeleteUserFormationDTO>{
    const url = `${this.baseUrl}/formation/deleteByName/${name}`
    const headers = new HttpHeaders().set('Authorization', 
    'Bearer ' + localStorage.getItem('token'));
    return this.http.delete<DeleteUserFormationDTO>(url, {
        headers
      });
  }

  createUserFormation(formation: ICreateFormation): 
  Observable<HttpResponse<UserFormationDTO>> {
    const url = `${this.baseUrl}/formation/create`;
    const body: ICreateFormation = formation;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.post<UserFormationDTO>(url, body, {
      headers,
      observe: 'response'
    });
  }

  updateUserFormation(formation: ICreateFormation): 
  Observable<HttpResponse<UserFormationDTO>> {
    const url = `${this.baseUrl}/formation/update`;
    const body: ICreateFormation = formation;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.put<UserFormationDTO>(url, body, {
      headers,
      observe: 'response'
    });
  }


}
