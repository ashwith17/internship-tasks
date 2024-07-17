import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  message: string;
  action: string;
  duration: number;
  colour:string;
}

@Injectable({
  providedIn: 'root'
})


export class ToastService {

  constructor() { }

  private toastSubject = new Subject<ToastMessage>();
  toastState = this.toastSubject.asObservable();

  showToast(message: string,colour:string='green', action: string = 'Close', duration: number = 3000) {
    this.toastSubject.next({ message, action, duration,colour });
  }
  

}
