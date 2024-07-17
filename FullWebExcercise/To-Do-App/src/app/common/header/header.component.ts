import { Component } from '@angular/core';
import { AuthService } from '../../../services/authService/auth.service';
import { AddtaskComponent } from '../../addtask/addtask.component';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../services/shared-service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AddtaskComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  dropDown:string = "Dashboard";
  
  constructor(private authService:AuthService,private sharedService:SharedService,private router:Router)
  {

  }
  ngOnIt()
  {
    if(this.dropDown=='dashboard')
    {
      this.router.navigate(['/dashboard']);
    }
    
    else if(this.dropDown=='active')
    {
      this.router.navigate(['/active']);
    }
    
    else if(this.dropDown=='completed')
    {
      this.router.navigate(['/completed']);
    }
  }

  logout()
  {
    this.authService.logout();
  }
  addTask(mode:string)
  {
    this.sharedService.displatAddTaskForm({isVisible:true,mode:mode,taskId:null});
  }
  taskNavigation()
  {
    if(this.dropDown=='Dashboard')
    {
      this.router.navigate(['/dashboard']);
    }
    
    else if(this.dropDown=='Active')
    {
      this.router.navigate(['/active']);
    }
    
    else if(this.dropDown=='completed')
    {
      this.router.navigate(['/completed']);
    }
  }

}
