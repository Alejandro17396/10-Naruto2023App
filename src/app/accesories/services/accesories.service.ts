import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from 'src/enviroments/enviroments';
import { Observable, catchError, of } from 'rxjs';
import { AccesorieSet, AccesoriesResponsePaginated, DeleteUserAccesorieSetDTO, GenerateAccesorieSetsResponse, ICreateUserAccesorieSet, UserAccesorieSetDTO } from '../interfaces/accesories.interfaces';
import { Atributo, DeleteUserSetDTOResponse, Filters, IntensityFilter, ListaBonus, Pageable_ } from 'src/app/sets/interfaces/set.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccesoriesService {

  private baseUrl:string = enviroments.baseUrl;
  constructor(private http:HttpClient) { }

  getAccesories():Observable<AccesoriesResponsePaginated>{
    return this.http.get<AccesoriesResponsePaginated>(`${this.baseUrl}/accesories`);
  }

  getAllAccesories():Observable<AccesoriesResponsePaginated>{
    return this.http.get<AccesoriesResponsePaginated>(`${this.baseUrl}/accesories/all`);
  }

  getAccesoriesPagination(pageable:Pageable_):Observable<AccesoriesResponsePaginated>{
    return this.http.get<AccesoriesResponsePaginated>
    (`${this.baseUrl}/accesories?page=${pageable.page}&size=${pageable.size}`);
  }

  getAccesoriesList():Observable<AccesorieSet[]>{
    return this.http.get<AccesorieSet[]>(`${this.baseUrl}/accesories/list`);
  }

  getAccesoriesComboSets(attributes : Atributo [],
    order : Atributo [],
    attributesFilter : ListaBonus [],
    page:Pageable_,
    filters:Filters,
    intensityFilter:IntensityFilter):
    Observable<GenerateAccesorieSetsResponse>{
     let intensity = intensityFilter?.intensity;
     let sets = intensityFilter?.sets;
     let startSet = intensityFilter?.startSet;
     let endSet = intensityFilter?.endSet;
     let headers = new HttpHeaders().set('Authorization', 'Bearer ' +  localStorage.getItem('token'));
     let setFilter:string = filters?.set? filters.set : "";
     let body = { attributes, order, attributesFilter, setFilter,
                  intensity, sets, startSet, endSet };
     return this.http.post<GenerateAccesorieSetsResponse>
     (`${this.baseUrl}/accesories/chatgpt?sorted=${filters.order}&filtred=${filters.filter}&page=${page.page}&size=${page.size}`
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

  saveSet(body:FormData):Observable<HttpResponse<AccesorieSet>>{
    const url = `${this.baseUrl}/accesories/accesorieSet/create`
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

  
    return this.http.post<AccesorieSet>(url, body, {
      headers,
      observe: 'response'
    });
  }

  updateSet(body:FormData):Observable<HttpResponse<AccesorieSet>>{
    const url = `${this.baseUrl}/accesories/accesorieSet/update`
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

  
    return this.http.put<AccesorieSet>(url, body, {
      headers,
      observe: 'response'
    });
  }

  deleteAccesorieSet(name:String):Observable<HttpResponse<DeleteUserSetDTOResponse>>{
    const url = `${this.baseUrl}/accesories/accesorieSet/delete/${name}`
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.delete<DeleteUserSetDTOResponse>(url,  {
      headers,
      observe: 'response'
    });
  }

}
