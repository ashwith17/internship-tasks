import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule}        from '@angular/forms';
import { SideBarComponent } from './Common/side-bar/side-bar.component';
import { NavbarComponent } from './Common/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,SideBarComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmployeeDirectory';
  
}
