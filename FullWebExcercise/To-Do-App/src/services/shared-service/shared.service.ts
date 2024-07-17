import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

interface ComponentState {
  isVisible: boolean;
  mode: string;
  taskId?:any;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private componentState = new BehaviorSubject<ComponentState>({ isVisible: false,mode:'add-task'});
  private deleteData = new BehaviorSubject<any>(null);
  private currentData=new BehaviorSubject<any>(null);
  currentComponentState = this.componentState.asObservable();
  currentDeleteState=this.deleteData.asObservable();
  currentDataState=this.currentData.asObservable();
  constructor() { }

  displatAddTaskForm(state:ComponentState)
  {
    this.componentState.next(state);
  }

  emitEvent(data:any)
  {
    this.deleteData.next(data);
  }

  DataChange(data:any)
  {
    this.currentData.next(data);
  }

  
}
