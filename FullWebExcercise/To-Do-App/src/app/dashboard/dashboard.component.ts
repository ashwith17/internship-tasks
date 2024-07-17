import { Component } from '@angular/core';
import { GreetingsComponent } from '../greetings/greetings.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskStatusComponent } from '../task-status/task-status.component';
import { SharedService } from '../../services/shared-service/shared.service';
import { TaskHeaderComponent } from '../task-header/task-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GreetingsComponent,TaskListComponent,TaskStatusComponent,TaskHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  activePercentage:string='';
  completedPercentage:string='';
  
  constructor(private sharedService:SharedService){

  }

 
  GetCount(data:any)
  {
    let val=(data.active/(data.active+data.completed))*100
    if(Number.isNaN(val))
    {
      val=0;
    }
    this.activePercentage=(val).toString().substring(0,5)+'%';
    val=(data.completed/(data.active+data.completed))*100
    if(Number.isNaN(val))
    {
      val=0;
    }
    this.completedPercentage=(val).toString().substring(0,5)+'%';
  }
 
}
