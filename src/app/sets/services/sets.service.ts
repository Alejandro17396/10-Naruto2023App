import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from 'src/enviroments/enviroments';
import { Atributo, DeleteUserSetDTOResponse, Filters, GenerateSetsResponse, ICreateUserSet, ListaBonus, Pageable, Pageable_, SaveEquipment, Set, SetsResponsePaginated, UserSetDTOResponse } from '../interfaces/set.interfaces';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  private baseUrl:string = enviroments.baseUrl;

  constructor(private http:HttpClient) { }

  getSets():Observable<SetsResponsePaginated>{
    return this.http.get<SetsResponsePaginated>(`${this.baseUrl}/sets`);
  }

  getSetsPagination(pageable:Pageable_):Observable<SetsResponsePaginated>{
    return this.http.get<SetsResponsePaginated>
    (`${this.baseUrl}/sets?page=${pageable.page}&size=${pageable.size}`);
  }

  getComboSets(attributes : Atributo [],
               order : Atributo [],
               attributesFilter : ListaBonus [],
               filters:Filters,
               page:Pageable_):
               Observable<GenerateSetsResponse>{
                let headers = new HttpHeaders().set('Authorization', 'Bearer ' +  localStorage.getItem('token'));
                let setName:string = filters.set;
                let body = { attributes, order, attributesFilter, setName };
                return this.http.post<GenerateSetsResponse>
                (`${this.baseUrl}/sets/chatgpt?sorted=${filters.order}&filtred=${filters.filter}&page=${page.page}&size=${page.size}`
                ,body,{ headers });
              }


  /*createUserSet(set:ICreateUserSet):Observable<UserSetDTOResponse>{
    let body:ICreateUserSet = set;
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' +  localStorage.getItem('token'));
    let params = new HttpParams()
    return this.http.post<UserSetDTOResponse>
    (`${this.baseUrl}/sets/create`
    ,body,{headers});
  }*/
  createUserSet(set: ICreateUserSet): 
  Observable<HttpResponse<UserSetDTOResponse>> {
    const url = `${this.baseUrl}/sets/create`;
    const body: ICreateUserSet = set;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.post<UserSetDTOResponse>(url, body, {
      headers,
      observe: 'response'
    });
  }

  transformUserSetToSet(set: ICreateUserSet): 
  Observable<HttpResponse<Set>> {
    const url = `${this.baseUrl}/sets/transform`;
    const body: ICreateUserSet = set;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.post<Set>(url, body, {
      headers,
      observe: 'response'
    });
  }

  updateUserSet(set: ICreateUserSet): 
  Observable<HttpResponse<UserSetDTOResponse>> {
    const url = `${this.baseUrl}/sets/update`;
    const body: ICreateUserSet = set;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.put<UserSetDTOResponse>(url, body, {
      headers,
      observe: 'response'
    });
  }

  getUserSets():Observable<UserSetDTOResponse[]>
  {
    const url = `${this.baseUrl}/sets/findByUser`;
    const headers = new HttpHeaders().set('Authorization', 
    'Bearer ' + localStorage.getItem('token'));
  
    return this.http.get<UserSetDTOResponse[]>(url, {
        headers
      });
  }

  getUserSet(name:string):Observable<UserSetDTOResponse|undefined>
  {
    const url = `${this.baseUrl}/sets/findBy/${name}`;
    const headers = new HttpHeaders().set('Authorization', 
    'Bearer ' + localStorage.getItem('token'));
  
    return this.http.get<UserSetDTOResponse>(url, {
        headers
      }).pipe(
        catchError( error => of(undefined))
      );
  }

  deleteUserSet(name:string):Observable<DeleteUserSetDTOResponse>{
    const url = `${this.baseUrl}/sets/deleteByName/${name}`
    const headers = new HttpHeaders().set('Authorization', 
    'Bearer ' + localStorage.getItem('token'));
    return this.http.delete<DeleteUserSetDTOResponse>(url, {
        headers
      });
  }

  saveSet(body:FormData):Observable<HttpResponse<Set>>{
    const url = `${this.baseUrl}/sets/equipment/create`
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

  
    return this.http.post<Set>(url, body, {
      headers,
      observe: 'response'
    });
  }

  updateSet(body:FormData):Observable<HttpResponse<Set>>{
    const url = `${this.baseUrl}/sets/equipment/update`
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

  
    return this.http.put<Set>(url, body, {
      headers,
      observe: 'response'
    });
  }

  deleteEquipment(name:String):Observable<HttpResponse<DeleteUserSetDTOResponse>>{
    const url = `${this.baseUrl}/sets/equipment/delete/${name}`
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.delete<DeleteUserSetDTOResponse>(url,  {
      headers,
      observe: 'response'
    });
  }

  saveSet2(set:SaveEquipment):Observable<HttpResponse<Set>>{
    const url = `${this.baseUrl}/sets/equipment/create`
    const body: SaveEquipment = set;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + 
    localStorage.getItem('token'));
  
    return this.http.post<Set>(url, body, {
      headers,
      observe: 'response'
    });
  }
        
}
