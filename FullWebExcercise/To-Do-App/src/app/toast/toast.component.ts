import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastMessage, ToastService } from '../../services/toastService/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  message: string = '';
  action: string = '';
  isVisible = false;
  colour=''
  private toastSubscription: Subscription = new Subscription();

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastSubscription = this.toastService.toastState.subscribe((toast: ToastMessage) => {
      this.message = toast.message;
      this.action = toast.action;
      this.colour=toast.colour;
      this.isVisible = true;

      setTimeout(() => {
        this.isVisible = false;
      }, toast.duration);
    });
  }

  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
  }

  close() {
    this.isVisible = false;
  }
}
