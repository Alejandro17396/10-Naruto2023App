import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from 'src/enviroments/enviroments';
import { Parte } from '../interfaces/set.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SetItemsService {
  private baseUrl:string = enviroments.baseUrl;
  constructor(private http:HttpClient) { }

  getSetItems():Observable<Parte[]>{
    return this.http.get<Parte[]>(`${this.baseUrl}/items/equipment`);
  }
}
