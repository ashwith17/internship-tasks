import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ToastComponent } from './toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AuthenticationComponent,ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'To-Do-App';
}
