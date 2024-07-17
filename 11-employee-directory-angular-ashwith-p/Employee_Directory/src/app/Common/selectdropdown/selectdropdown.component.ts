import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-selectdropdown',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './selectdropdown.component.html',
  styleUrl: './selectdropdown.component.css'
})
export class SelectdropdownComponent {

  @Input() name:string=''
  @Input() items:String[]=[]

  @Output() sendData= new EventEmitter<object>();
  selectedItem: string="none";
  

  sendFiltersData() {

    const dataToSend = {
      var1: (document.getElementById(this.name) as HTMLSelectElement).value,
    };
    this.sendData.emit(dataToSend);
  }

  resetValue()
  {
    this.selectedItem = 'none';
  }
}
