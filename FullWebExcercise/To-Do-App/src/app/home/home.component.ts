import { Component } from '@angular/core';
import { HeaderComponent } from '../common/header/header.component';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AddtaskComponent } from '../addtask/addtask.component';
import { SharedService } from '../../services/shared-service/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent,RouterOutlet,AddtaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  showAddTaskComponent: boolean = false;
  mode!:string;
  taskId:number | null | undefined;
  private subscription:Subscription | undefined;

  constructor(private sharedService: SharedService) {}

  ngOnInit()
  {
    this.subscription = this.sharedService.currentComponentState.subscribe(state => {
      this.showAddTaskComponent = state.isVisible;
      this.mode = state.mode;
      this.taskId=state.taskId;
    });
  }

}
