import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from 'src/enviroments/enviroments';
import { CompareNinjasUserDTO, DeleteNinjaUserDTO, ICreateUserNinja, Ninja, NinjaFilter, NinjaResponsePageable, NinjaUserFormationDTO, NinjasResponsePaginated } from '../interfaces/Ninja.interfaces';
import { Atributo, DeleteUserSetDTOResponse, Filters, ListaBonus, Pageable_ } from 'src/app/sets/interfaces/set.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NinjasService {

  private baseUrl:string = enviroments.baseUrl;
  constructor(private http:HttpClient) { }

  getNinjas():Observable<NinjasResponsePaginated>{
    return this.http.get<NinjasResponsePaginated>(`${this.baseUrl}/ninjas`);
  }
  getAllNinjas():Observable<NinjasResponsePaginated>{
    return this.http.get<NinjasResponsePaginated>(`${this.baseUrl}/ninjas/all`);
  }
  getNinjasPagination(page:Pageable_):Observable<NinjasResponsePaginated>{
    return this.http.get<NinjasResponsePaginated>
    (`${this.baseUrl}/ninjas?page=${page.page}&size=${page.size}`);
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

  deleteNinjaUser(name:string):Observable<DeleteNinjaUserDTO>{
    const url = `${this.baseUrl}/ninjas/deleteByName/${name}`
    const headers = new HttpHeaders().set('Authorization', 
    'Bearer ' + localStorage.getItem('token'));
    return this.http.delete<DeleteNinjaUserDTO>(url, {
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


  getNinjasFilterAnd(filter:NinjaFilter,sorted:boolean,filtred:boolean,page:Pageable_,
    awakening:boolean,or:boolean):
  Observable<NinjaResponsePageable>{
    const url = 
    `${this.baseUrl}/ninjas/filter/and?sorted=${sorted}&filtred=${filtred}&or=${or}&awakenings=${awakening}`;
    const body: NinjaFilter = filter;
    console.log("voy a hacer llamada" +sorted+" "+filtred)
    console.log(filter)
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.post<NinjaResponsePageable>(url, body, {
      headers
    });
  }

  getNinjasFilterOr(filter:NinjaFilter,sorted:boolean,filtred:boolean,page:Pageable_,
    awakening:boolean):
  Observable<NinjaResponsePageable>{
    const url = 
    `${this.baseUrl}/ninjas/filter/or?sorted=${sorted}&filtred=${filtred}`;
    const body: NinjaFilter = filter;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.post<NinjaResponsePageable>(url, body, {
      headers
    });
  }

  compareNinjasUser(filter:CompareNinjasUserDTO):
  Observable<CompareNinjasUserDTO>{
    const url = 
    `${this.baseUrl}/ninjas/compareNinjas`;
    const body: CompareNinjasUserDTO = filter;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<CompareNinjasUserDTO>(url, body, {
      headers
    });
  }

  saveNinja(body:FormData):Observable<HttpResponse<Ninja>>{
    const url = `${this.baseUrl}/ninjas/ninja/create`
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

  
    return this.http.post<Ninja>(url, body, {
      headers,
      observe: 'response'
    });
  }

  updateNinja(body:FormData):Observable<HttpResponse<Ninja>>{
    const url = `${this.baseUrl}/ninjas/ninja/update`
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

  
    return this.http.put<Ninja>(url, body, {
      headers,
      observe: 'response'
    });
  }

  deleteNinja(name:String):Observable<HttpResponse<DeleteUserSetDTOResponse>>{
    const url = `${this.baseUrl}/ninjas/ninja/delete/${name}`
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
    return this.http.delete<DeleteUserSetDTOResponse>(url,  {
      headers,
      observe: 'response'
    });
  }

}
