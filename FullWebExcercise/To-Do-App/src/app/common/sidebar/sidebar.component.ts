import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SharedService } from '../../../services/shared-service/shared.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private sharedService:SharedService){}
  addTask(mode:string)
  {
    this.sharedService.displatAddTaskForm({isVisible:true,mode:mode,taskId:null});
  }
  
}
