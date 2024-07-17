import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }
  getLocationtById(id:number):Observable<any>{
    try
    {
      return this.http.get<any>('https://localhost:7165/api/Location/'+id.toString());
    }
    catch(Exception){
      return  new Observable<any>;
    }
  }

  getAllLocations():Observable<any[]>{
    try
    {
      return this.http.get<any[]>('https://localhost:7165/api/Location/All');
    }
    catch(Exception){
      return new Observable<any>;
    }
  }
}
