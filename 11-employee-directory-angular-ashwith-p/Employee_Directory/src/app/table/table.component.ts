import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { EmployeeDto } from '../../models/EmployeeDto';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employeeService/employee.service';
import { Console, error } from 'console';
import { SharedService } from '../../services/sharedService/shared.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
@Input() tabledata:EmployeeDto[]=[]
@Output() tabledataChange = new EventEmitter<any[]>();
@Output() checkboxChange = new EventEmitter<any[]>();
selectedIds:string[]=[]
displayDiv:string=''
isVisible:boolean=false;

constructor(private renderer:Renderer2,private employeeService:EmployeeService,private sharedService:SharedService){

    this.renderer.listen('body', 'click', this.onBodyClick.bind(this));
}

onBodyClick(event: MouseEvent): void {
  if(this.isVisible)
  {
    this.isVisible=false;
  }
  else
  {
    this.displayDiv=''
  }
}
sortColumn(prop:any)
{
  this.tabledataChange.emit(prop);
}

changeState()
{
  this.checkboxChange.emit([this.selectedIds.length]);
}
isSorted(columnName:string) {
  for (var i = 0; i < this.tabledata.length - 1; i++) {
      if (((this.tabledata[i] as any)[columnName]) > ((this.tabledata[i + 1]) as any)[columnName]) {
          return false;
      }
  }
  return true;
}

sortDataByColumn(columnName:any, orderBy = "asec") {
  var isAsec = this.isSorted(columnName);
  if (isAsec) {
      orderBy = "desc";
  }
  if (orderBy == 'asec') {
      this.tabledata.sort((a,b) => ((a as any)[columnName] > (b as any)[columnName] ? 1 : -1));
  }
  else {
      this.tabledata.sort((a, b) => ((a as any)[columnName] < (b as any)[columnName]) ? 1 : -1);
  }
}
selectEmployee(event:Event,id:string)
{
  if((event.target as HTMLInputElement).checked)
  {
    this.selectedIds.push(id)
  }
  else if(id=="all")
  {
    for(let i=0;i<this.tabledata.length;i++)
    {
      this.selectedIds.push(this.tabledata[i].Id);
    }
  }
  else{
    this.selectedIds=this.selectedIds.filter(Id=>Id!=id);
  }
  console.log(this.selectedIds)
  this.changeState();
}
getFloatingDiv(id:string)
{
  if(this.isVisible)
  {
    this.displayDiv=''
    this.isVisible=false
  }
  else
  {
    this.displayDiv=id;
    this.isVisible=true;
  }
}
DeleteEmployee(id:string)
{
  this.employeeService.DeleteEmployee(id).subscribe({
    next:(data)=>{console.log(data)
    this.sharedService.DataChangeEvent()},
    error:(error)=>console.log(error)
  });
}
}
