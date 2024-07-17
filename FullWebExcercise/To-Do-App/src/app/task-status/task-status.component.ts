import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.css'
})
export class TaskStatusComponent {
  @Input() text: string = '';
  @Input() bgColor:string=''
  @Input() image:string=''
  @Input() percentage:string=''
  
  
  
}
