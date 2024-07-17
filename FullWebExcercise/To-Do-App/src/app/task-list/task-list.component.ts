import { Component, Renderer2, output,EventEmitter, Output } from '@angular/core';
import { ToDoService } from '../../services/to-do-service/to-do.service';
import { Task } from '../../models/Task';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { SharedService } from '../../services/shared-service/shared.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toastService/toast.service';
import { Status } from '../../enums/status';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks:Task[];
  currentURL:string='';
  isDisplayed:boolean;
  displayDescription:number=0;
  private deleteSubscription!:Subscription;
  private changeDataSubscription!:Subscription;
  timeMessage:string=''
  completedTasks:number=0;
  activeTasks:number=0;
  @Output() count:EventEmitter<any>=new EventEmitter(); 
  
  constructor(private toDoService:ToDoService,private router:Router,private renderer: Renderer2,
    private sharedService:SharedService,private toasterService:ToastService){
    this.tasks = [];
    this.isDisplayed=false;
    this.renderer.listen('body', 'click', this.onBodyClick.bind(this));
    
  }
  onBodyClick(event: MouseEvent): void {
    if(this.isDisplayed)
    {
      this.isDisplayed=false;
    }
    else
    {
      this.displayDescription=0
    }
  }
    
  
 ngOnInit()
 {
  this.changeDataSubscription=this.sharedService.currentDataState.subscribe(()=>{
    this.initialize();
  })
  this.deleteSubscription=this.sharedService.currentDeleteState.subscribe(()=>{
    this.deleteAll();
  })
  
 }

 initialize()
 {
  this.currentURL=this.router.url;
 
    if(this.currentURL=='/dashboard')
    {
      this.toDoService.GetAllTask(Status.All).subscribe({
        next : data =>{ this.tasks = data},
        complete:()=>{
          this.CountTasks();
          this.sendValues();}
      })
    }
    else if(this.currentURL=='/active')
    {
      this.toDoService.GetAllTask(Status.Active).subscribe({
        next : data =>{ this.tasks = data}
      })
    }
    else
    {
      this.toDoService.GetAllTask(Status.Completed).subscribe({
        next : data =>{ this.tasks = data}
      })
    }
 }

 sendValues()
 {
  this.count.emit({'active':this.activeTasks,'completed':this.completedTasks});
 }

 CountTasks()
 {
  this.completedTasks=0;
  this.activeTasks=0;
  for(let i=0;i<this.tasks.length;i++)
  {
    if(this.tasks[i].isCompleted)
    {
      this.completedTasks+=1
    }
    else
    {
      this.activeTasks+=1
    }
  }
 }

 getDescription(id:number)
 {
  this.toDoService.GetTaskById(id).subscribe({
    next:(data)=>{
      var d=(new Date()).getTime()-(new Date(data.taskDate)).getTime()
      const seconds = Math.floor(d / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if(days>0)
      {
        this.timeMessage="Added "+days.toString()+" days ago"
      }
      else if(hours>0)
      {
        this.timeMessage="Added "+hours.toString()+" hours ago"
      }
      else if(minutes>0)
      {
        this.timeMessage="Added "+minutes.toString()+" minutes ago"
      }
      else
      {
        this.timeMessage="Added "+seconds.toString()+" seconds ago"
      }
    }
  })
  if(this.currentURL!='/dashboard')
  {
    this.displayDescription=id;
    this.isDisplayed=true;
  }  
 }
 deleteTask(taskId:number)
 {
  this.toDoService.DeleteTask(taskId).subscribe({
    next:()=>{this.toasterService.showToast("Task Deleted Successfully"), this.initialize()}
  })
 }
 UpdateStatus(status:boolean,taskId:number)
 {
  this.toDoService.GetTaskById(taskId).subscribe({
    next:(data)=>{this.UpdateTask(status,taskId,data)}
  })
 }
 UpdateTask(status:boolean,taskId:number,data:any)
 {
  data.isCompleted=!status;
  this.toDoService.EditTask(taskId,data).subscribe({
    next:()=>{this.toasterService.showToast("Task Edited Successfully")},
    complete: ()=>{this.initialize()}
  })
 }
 editTask(id:number)
 {
  this.sharedService.displatAddTaskForm({isVisible:true,mode:"edit",taskId:id});
 }

 deleteAll()
 {
  let val=this.tasks;
  this.tasks=[]
  for(let i=0;i<val.length;i++)
  {
    this.toDoService.DeleteTask(val[i].id).subscribe({});
    this.toasterService.showToast("Deleted All Successfully")
  }
  
 }
 
}
