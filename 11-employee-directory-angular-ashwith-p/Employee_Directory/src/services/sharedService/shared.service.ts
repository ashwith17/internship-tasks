import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private dataChange= new Subject();
  isDataChanged=this.dataChange.asObservable();

  DataChangeEvent()
  {
    this.dataChange.next('')
  }
}
