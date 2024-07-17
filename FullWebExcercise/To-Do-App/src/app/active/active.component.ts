import { Component } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TaskHeaderComponent } from '../task-header/task-header.component';

@Component({
  selector: 'app-active',
  standalone: true,
  imports: [TaskListComponent,TaskHeaderComponent],
  templateUrl: './active.component.html',
  styleUrl: './active.component.css'
})
export class ActiveComponent {

}
