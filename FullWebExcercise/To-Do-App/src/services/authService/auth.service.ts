import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { ToDoService } from '../to-do-service/to-do.service';
import { ToastService } from '../toastService/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private router: Router,private toDoService:ToDoService,private toastService:ToastService) { 
    
  }

  AuthenticateUser(user:User,endpoint:string){
    
    let isValidUser=false;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.httpClient.post<any>(environment.BaseURL+endpoint,user,{headers}).subscribe(
      {
        next:(data)=>{
          this.toastService.showToast("Logged In Successfully!");
          sessionStorage.setItem("token",data.token);
          isValidUser=true;
          this.router.navigate(['dashboard']);
        },
        error:()=>{
          if(endpoint.includes("create"))
          {
            this.toastService.showToast("User Already Exists!");
          }
          else{

            this.toastService.showToast("InValid user or Password!",'red');
          }
        }
      }
    )
  }
  login(user:User)
  {
    let endpoint="User/";
    this.AuthenticateUser(user,endpoint);
  }
  SignUp(user:User)
  {
    let endpoint="User/create/";
    this.AuthenticateUser(user,endpoint);
  }
  logout()
  {
    this.toastService.showToast("Signed Out Successfully")
    sessionStorage.removeItem("token");
    this.router.navigate(['login']);
  }
}
