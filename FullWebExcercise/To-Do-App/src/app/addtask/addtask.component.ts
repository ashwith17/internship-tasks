import { Component } from '@angular/core';
import { SharedService } from '../../services/shared-service/shared.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/Task';
import { ToDoService } from '../../services/to-do-service/to-do.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from '../../services/toastService/toast.service';

@Component({
  selector: 'app-addtask',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule],
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.css'
})
export class AddtaskComponent {
  
  form: FormGroup;
  subscription: Subscription | undefined;
  showAddTaskComponent: boolean=false;
  mode: string='';
  taskId: number| null=null;
  constructor(private sharedService:SharedService, private fb: FormBuilder,private todoService:ToDoService,private toasterService:ToastService){
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    
  }

  ngOnInit()
  {
    this.subscription = this.sharedService.currentComponentState.subscribe(state => {
      this.showAddTaskComponent = state.isVisible;
      this.mode = state.mode;
      this.taskId=state.taskId;
      if(this.taskId)
      {
        this.todoService.GetTaskById(this.taskId).subscribe({
        next:data=>{
          this.form = this.fb.group({
            title: [data.name],
            description: [data.description]
          })
        }})
      
      }
    })
  }

  RemoveAddTaskComponent()
  {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.sharedService.displatAddTaskForm({isVisible:false,mode:"add-task"})
  }

  addTask()
  {
    
    let val=this.form.value;
    if(this.taskId)
    {
      let task=new Task({'Name':val.title,'Description':val.description,'isCompleted':false,'id':this.taskId})
      this.todoService.EditTask(this.taskId,task).subscribe({
        next:()=>{this.toasterService.showToast("Task Editted Successfully")},
        complete:()=>{
          this.sharedService.DataChange('');}
      })
      this.RemoveAddTaskComponent();
    }
    else
    {
      if(val.title.length!=0)
      {

        let task=new Task({'Name':val.title,'Description':val.description,'isCompleted':false,'id':0})
        this.todoService.CreateTask(task).subscribe({
          next:data=>{this.toasterService.showToast("Task Added Successfully")},
          complete:()=>{
            this.sharedService.DataChange('');}
        })
        this.RemoveAddTaskComponent();
      }
      else{
        this.toasterService.showToast("Please Enter the Title!!",'red')
      }

    }
    
    }
}
