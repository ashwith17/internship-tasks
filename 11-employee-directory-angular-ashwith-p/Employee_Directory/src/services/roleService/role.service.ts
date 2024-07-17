import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
  getRoleById(id:number):Observable<any>{
    try
    {
      return this.http.get<any>('https://localhost:7165/api/Role/'+id.toString());
    }
    catch(Exception){
      return new Observable<any>;
    }
  }

  getAllRoles():Observable<any[]>{
    try
    {
      return this.http.get<any[]>('https://localhost:7165/api/Role/All');
    }
    catch(Exception){
      return new Observable<any>;
    }
  }
}
