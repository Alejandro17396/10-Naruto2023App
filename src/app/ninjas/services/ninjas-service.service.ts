import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from 'src/enviroments/enviroments';
import { NinjasResponsePaginated } from '../interfaces/Ninja.interfaces';
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

  /*getNinjasComboSets(attributes : Atributo [],
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
   }*/
}
