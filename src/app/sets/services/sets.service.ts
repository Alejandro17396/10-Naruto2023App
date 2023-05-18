import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from 'src/enviroments/enviroments';
import { Atributo, DeleteUserSetDTOResponse, Filters, GenerateSetsResponse, ICreateUserSet, ListaBonus, Set, SetsResponsePaginated, UserSetDTOResponse } from '../interfaces/set.interfaces';
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

  getComboSets(attributes : Atributo [],
               order : Atributo [],
               attributesFilter : ListaBonus [],
               
               filters:Filters):
               Observable<GenerateSetsResponse>{
                let headers = new HttpHeaders().set('Authorization', 'Bearer ' +  localStorage.getItem('token'));
                let setName:string = filters.set;
                let body = { attributes, order, attributesFilter, setName };
                return this.http.post<GenerateSetsResponse>
                (`${this.baseUrl}/sets/CombinacionesBonusTotal?sorted=${filters.order}&filtred=${filters.filter}`
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

              getSetTest() {
                let url = {
                    "nombre": "amegakure set",
                    "partes": [
                        {
                            "nombre": "amegakure armor",
                            "atributo": {
                                "nombre": "physical defense"
                            },
                            "valor": 59000
                        },
                        {
                            "nombre": "amegakure belt",
                            "atributo": {
                                "nombre": "power"
                            },
                            "valor": 590000
                        },
                        {
                            "nombre": "amegakure boots",
                            "atributo": {
                                "nombre": "speed"
                            },
                            "valor": 59000
                        },
                        {
                            "nombre": "amegakure coat",
                            "atributo": {
                                "nombre": "strategy defense"
                            },
                            "valor": 59000
                        },
                        {
                            "nombre": "amegakure headband",
                            "atributo": {
                                "nombre": "physical defense"
                            },
                            "valor": 59000
                        },
                        {
                            "nombre": "amegakure kunai",
                            "atributo": {
                                "nombre": "physical attack"
                            },
                            "valor": 59000
                        },
                        {
                            "nombre": "amegakure scroll",
                            "atributo": {
                                "nombre": "strategy attack"
                            },
                            "valor": 59000
                        },
                        {
                            "nombre": "amegakure shuriken",
                            "atributo": {
                                "nombre": "physical attack"
                            },
                            "valor": 59000
                        }
                    ],
                    "bonuses": [
                        {
                            "nombre": "2 effect : ",
                            "listaBonus": [
                                {
                                    "nombreAtributo": "attack",
                                    "valor": 25,
                                    "action": "increase",
                                    "impact": "self",
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "nombreAtributo": "damage rate",
                                    "valor": 20,
                                    "action": "increase",
                                    "impact": "self",
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "nombreAtributo": "force",
                                    "valor": 10000,
                                    "action": "increase",
                                    "impact": "self",
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "nombreAtributo": "punch rate",
                                    "valor": 30,
                                    "action": "increase",
                                    "impact": "self",
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                }
                            ]
                        },
                        {
                            "nombre": "4 effect : ",
                            "listaBonus": [
                                {
                                    "nombreAtributo": "after release skill has 80% chance to make 2 random enemies enter frozen for 2 rounds",
                                    "valor": 0,
                                    "action": "increase",
                                    "impact": "self",
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "nombreAtributo": "damage rate",
                                    "valor": 20,
                                    "action": "increase",
                                    "impact": "self",
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "nombreAtributo": "increase cc rate",
                                    "valor": 40,
                                    "action": "increase",
                                    "impact": "self",
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                }
                            ]
                        },
                        {
                            "nombre": "6 effect : ",
                            "listaBonus": [
                                {
                                    "nombreAtributo": "after release skill dispel 2 random allies debuff",
                                    "valor": 0,
                                    "action": "increase",
                                    "impact": "self",
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "nombreAtributo": "agility",
                                    "valor": 50000,
                                    "action": "increase",
                                    "impact": "self",
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "nombreAtributo": "weaken enemy attack",
                                    "valor": 30,
                                    "action": "increase",
                                    "impact": "self",
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                }
                            ]
                        }
                    ]
                };
            
                return Object.assign(new Set(), url);
              }
        
}
