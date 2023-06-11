import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from 'src/enviroments/enviroments';
import { Observable, catchError, of } from 'rxjs';
import { AccesorieSet, AccesoriesResponsePaginated, DeleteUserAccesorieSetDTO, GenerateAccesorieSetsResponse, ICreateUserAccesorieSet, UserAccesorieSetDTO } from '../interfaces/accesories.interfaces';
import { Atributo, Filters, ListaBonus } from 'src/app/sets/interfaces/set.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccesoriesService {

  private baseUrl:string = enviroments.baseUrl;
  constructor(private http:HttpClient) { }

  getAccesories():Observable<AccesoriesResponsePaginated>{
    return this.http.get<AccesoriesResponsePaginated>(`${this.baseUrl}/accesories`);
  }

  getAccesoriesComboSets(attributes : Atributo [],
    order : Atributo [],
    attributesFilter : ListaBonus [],
    
    filters:Filters):
    Observable<GenerateAccesorieSetsResponse>{
     let headers = new HttpHeaders().set('Authorization', 'Bearer ' +  localStorage.getItem('token'));
     let setFilter:string = filters?.set? filters.set : "";
     let body = { attributes, order, attributesFilter, setFilter };
     return this.http.post<GenerateAccesorieSetsResponse>
     (`${this.baseUrl}/accesories/CombinacionesBonusTotal?sorted=${filters.order}&filtred=${filters.filter}`
     ,body,{ headers });
   }

   createUserSet(set: ICreateUserAccesorieSet): 
  Observable<HttpResponse<UserAccesorieSetDTO>> {
    const url = `${this.baseUrl}/accesories/create`;
    const body: ICreateUserAccesorieSet = set;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    console.log("hjpa")
    return this.http.post<UserAccesorieSetDTO>(url, body, {
      headers,
      observe: 'response'
    });
  }

  updateUserSet(set: ICreateUserAccesorieSet): 
  Observable<HttpResponse<UserAccesorieSetDTO>> {
    const url = `${this.baseUrl}/accesories/update`;
    const body: ICreateUserAccesorieSet = set;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.put<UserAccesorieSetDTO>(url, body, {
      headers,
      observe: 'response'
    });
  }

  getUserSets():Observable<UserAccesorieSetDTO[]>
  {
    const url = `${this.baseUrl}/accesories/findByUser`;
    const headers = new HttpHeaders().set('Authorization', 
    'Bearer ' + localStorage.getItem('token'));
  
    return this.http.get<UserAccesorieSetDTO[]>(url, {
        headers
      });
  }

  getUserSet(name:string):Observable<UserAccesorieSetDTO|undefined>
  {
    const url = `${this.baseUrl}/accesories/findBy/${name}`;
    const headers = new HttpHeaders().set('Authorization', 
    'Bearer ' + localStorage.getItem('token'));
  
    return this.http.get<UserAccesorieSetDTO>(url, {
        headers
      }).pipe(
        catchError( error => of(undefined))
      );
  }

  deleteUserSet(name:string):Observable<DeleteUserAccesorieSetDTO>{
    const url = `${this.baseUrl}/accesories/deleteByName/${name}`
    const headers = new HttpHeaders().set('Authorization', 
    'Bearer ' + localStorage.getItem('token'));
    return this.http.delete<DeleteUserAccesorieSetDTO>(url, {
        headers
      });
  }

  deleteUserSet2(name:string):Observable<string>{
    const url = `${this.baseUrl}/accesories/deleteByName/${name}`
    const headers = new HttpHeaders().set('Authorization', 
    'Bearer ' + localStorage.getItem('token'));
    return this.http.delete<string>(url, {
        headers
      });
  }

  transformUserAccesorieSetToAccesorieSet(set: ICreateUserAccesorieSet): 
  Observable<HttpResponse<AccesorieSet>> {
    const url = `${this.baseUrl}/accesories/transform`;
    const body: ICreateUserAccesorieSet = set;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.post<AccesorieSet>(url, body, {
      headers,
      observe: 'response'
    });
  }


}
