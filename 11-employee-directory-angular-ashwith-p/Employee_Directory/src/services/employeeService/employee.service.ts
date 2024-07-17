import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../models/Employee';
import { EmployeeDto } from '../../models/EmployeeDto';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees():Observable<Employee[]>{
    try
    {
      return this.http.get<Employee[]>('https://localhost:7165/api/Employee/All');
    }
    catch(Exception){
      return new Observable<Employee[]>;
    }
  }

  getEmployeeById(id:string):Observable<Employee>{
    try
    {
      return this.http.get<Employee>('https://localhost:7165/api/Employee/'+id);
    }
    catch(Exception){
      return new Observable<Employee>;
    }
  }

  getEmployeesByRole(id:string):Observable<any[]>
  {
    return this.http.get<Employee[]>('https://localhost:7165/api/Employee/RoleId/'+id);
  }
  addEmployee(emp:Employee){

      return this.http.post<Employee>('https://localhost:7165/api/Employee/Create',emp);
    
  }
  updateEmployee(emp:Employee):Observable<Employee[]>
  {
    let url="https://localhost:7165/api/Employee/Edit/"+emp.Id;
    return this.http.put<Employee[]>(url,emp);
  }
  DeleteEmployee(id:string):Observable<any>
  {
    return this.http.delete<any>("https://localhost:7165/api/Employee/Delete/"+id)
  }
}
