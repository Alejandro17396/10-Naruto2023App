import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from 'src/enviroments/enviroments';
import { Observable } from 'rxjs';
import { AccesoriesResponsePaginated } from '../interfaces/accesories.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccesoriesService {

  private baseUrl:string = enviroments.baseUrl;
  constructor(private http:HttpClient) { }

  getAccesories():Observable<AccesoriesResponsePaginated>{
    return this.http.get<AccesoriesResponsePaginated>(`${this.baseUrl}/accesories`);
  }


}
