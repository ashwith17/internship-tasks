import { DatePipe } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared-service/shared.service';

@Component({
  selector: 'app-task-header',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-header.component.html',
  styleUrl: './task-header.component.css'
})
export class TaskHeaderComponent {
  currentURL:string='';
  date=new Date();
  showAlert:boolean=false;
  isOpen:boolean=false;
  constructor(private router:Router,private sharedService:SharedService,private renderer: Renderer2){
    this.renderer.listen('body', 'click',()=>{ 
      if(this.showAlert && this.isOpen)
      {
        this.showAlert=false
        this.isOpen=false
      }
      else if(this.showAlert)
      {
        this.isOpen=true
      }
    });
  }
  ngOnInit()
  {
    this.currentURL=this.router.url;
  }
  deleteAll()
  {
    this.Close()
    this.sharedService.emitEvent('');
  }

  Close()
  {
    this.showAlert=false
    this.isOpen=false
  }
}
