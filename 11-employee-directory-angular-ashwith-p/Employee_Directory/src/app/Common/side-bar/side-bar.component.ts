import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet,Router, NavigationEnd, NavigationStart } from '@angular/router';
import { features } from 'process';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ RouterOutlet, RouterLink,CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent{
  currentURL = ''
  constructor(private router:Router)
  {
  }
  ngOnInit() {
    this.router.events.subscribe((event) => this.currentURL=(event as any).url);
  }
}