import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartentService {

  constructor(private http: HttpClient) { }
  getDepartmentById(id:number):Observable<any>{
    try
    {
      return this.http.get<any>('https://localhost:7165/api/Department/'+id.toString());
    }
    catch(Exception){
      return new Observable<any>;
    }
  }
  getAllDepartments():Observable<any[]>{
    try
    {
      return this.http.get<any[]>('https://localhost:7165/api/Department/All');
    }
    catch(Exception){
      return new Observable<any>;
    }
  }
}
