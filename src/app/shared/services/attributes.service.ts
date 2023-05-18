import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from 'src/enviroments/enviroments';
import { Attribute } from '../interfaces/attributes.interface,';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  
  private baseUrl:string = enviroments.baseUrl;

  constructor(private http:HttpClient) { }

  getAttributes():Observable<Attribute[]>{
    return this.http.get<Attribute[]>(`${this.baseUrl}/attributes`);
  }
}
