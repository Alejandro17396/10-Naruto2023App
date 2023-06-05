import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NinjaFilter, NinjaUserFormationDTO } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { CompareFormations, FormationResponsePaginated, UserFormationDTO } from '../interfaces/formations.interface';
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


}
