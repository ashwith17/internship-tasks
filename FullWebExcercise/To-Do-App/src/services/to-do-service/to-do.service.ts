import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Task } from '../../models/Task';
import { Status } from '../../enums/status';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http:HttpClient) { }

  GetAllTask(status:Status):Observable<Task[]>
  {
    let url=environment.BaseURL+"Task/All";
    return this.http.get<Task[]>(`${url}/${status}`);
  }
  GetTaskById(id:number):Observable<Task>
  {
    return this.http.get<Task>(environment.BaseURL+'Task/'+id);
  }
  GetCompletedTask(iscompleted:boolean):Observable<any>
  {
    return this.http.get(environment.BaseURL+'Task/ConditionalData/'+iscompleted);
  }
  CreateTask(task:Task):Observable<any>
  {
    return this.http.post(environment.BaseURL+"Task/CreateTask",task,{responseType:'json'})
  }

  DeleteTask(taskId:number):Observable<any>
  {
    return this.http.delete(environment.BaseURL+'Task/Delete/'+taskId);
  }
  EditTask(taskId:number,task:Task):Observable<any>
  {
    return this.http.put(environment.BaseURL+'Task/Update/'+taskId,task);
  }
  

}
