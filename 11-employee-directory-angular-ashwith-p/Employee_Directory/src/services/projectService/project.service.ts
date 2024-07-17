import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects():Observable<any[]>{
    try
    {
      return this.http.get<any[]>('https://localhost:7165/api/Project/All');
    }
    catch(Exception){
      return new Observable<any>;
    }
  }
}
