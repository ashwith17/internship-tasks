
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { AuthService } from '../../services/authService/auth.service';
import { ToastService } from '../../services/toastService/toast.service';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

  form: FormGroup;
  currentUrl: string = ''
  title: string = '';
  titlecolour: string = ''
  bgcolour: string = ''
  msg: string = ''
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService,private toastService:ToastService) {

    this.currentUrl = this.router.url;
    if (this.currentUrl == '/login') {
      this.title = "Login";
      this.titlecolour = "#BA5112"
      this.bgcolour = "#fff"
      this.msg = "Don't have an Account?Create "
    }
    else {
      this.title = "Sign Up"
      this.titlecolour = "#fff"
      this.bgcolour = "#EDB046"
      this.msg = "Already have an Account?Login "
    }
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  changePath() {
    if (this.currentUrl == '/login') {
      this.router.navigate(['signup'])
    }
    else {
      this.router.navigate(['login'])
    }
  }

  Autenticate() {
    let val = this.form.value;
    let user = new User(val.email, val.password);
    if( val.password.length==0 && val.email.length==0)
    {
      this.toastService.showToast("Please Enter the UserName and Password",'red')
    }
    else if(val.password.length==0)
    {
      this.toastService.showToast("Please Enter the Password",'red');
    }
    else if(val.email.length==0)
    {
      this.toastService.showToast("Please Enter the userName",'red');
    }
    else
    {
      if (this.currentUrl == '/login') {
        this.authService.login(user);
      }
      else {
        this.authService.SignUp(user);
      }
    }
  }

}
