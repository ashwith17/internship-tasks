
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SelectdropdownComponent } from '../Common/selectdropdown/selectdropdown.component';
import { Employee } from '../../models/Employee';
import { EmployeeDto } from '../../models/EmployeeDto';
import { EmployeeService } from '../../services/employeeService/employee.service';
import { DepartentService } from '../../services/departmentService/departent.service';
import { TableComponent } from '../table/table.component';
import { LocationService } from '../../services/locationService/location.service';
import { RoleService } from '../../services/roleService/role.service';
import { Observable, Subscription, catchError, firstValueFrom, map, of } from 'rxjs';
import { error } from 'node:console';
import { SharedService } from '../../services/sharedService/shared.service';
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterLink,CommonModule,SelectdropdownComponent,TableComponent],
  providers: [EmployeeService],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  alphabets:string[]=[]
  departments:String[]=["Product Engg.","Quality Analyst","UI/UX"]
  locations:String[]=["Hyderabad","Mumbai","Banglore"]
  statusValues:String[]=["Active","InActive"]
  employeesData:EmployeeDto[]=[]
  status=''
  departent=''
  loc=''
  isDataFiltered=false
  isAlphabetFilterApplied=false
  aplhabet=''
  selectedItem: string | null = null;
  btnColourChange:boolean=false;

  //employees:EmployeeDto[]=[]
  employees:EmployeeDto[]=[]
  dummyData:EmployeeDto[]=[]
  dataChangeSubscription:Subscription|undefined;
  @ViewChild('statusref') statusRef: SelectdropdownComponent | undefined;
  @ViewChild('locationref') locationRef: SelectdropdownComponent | undefined;
  @ViewChild('departmentref') departmentRef: SelectdropdownComponent | undefined;

  constructor(private employeeService: EmployeeService,private sharedService:SharedService) { }

  ngOnInit() {
  
    this.generateAlphabets();
    this.dataChangeSubscription=this.sharedService.isDataChanged.subscribe({
      next:()=>this.generateEmployeeTable()
    })
    // this.employees=[
    //   {
    //     FirstName:"Ashwith",
    //     LastName:"Nani",
    //     JoiningDate:"12/12/2023",
    //     Email:"ash@gmail.com",
    //     Location:"Hyderabad",
    //     Department:"Product Engg.",
    //     Role:"Intern",
    //     Id:"TZ0001"
    //   },
    //   {
    //     FirstName:"Keelu",
    //     LastName:"Nani",
    //     JoiningDate:"11/11/2011",
    //     Email:"ashwith@gmail.com",
    //     Location:"Chennai",
    //     Department:"UI/UX",
    //     Role:"Intern",
    //     Id:"TZ0002"
    //   }
    // ]
    this.generateEmployeeTable() ;
  };

  async generateEmployeeTable()
  {
    this.employeeService.getEmployees().subscribe({
      next:async (data)=>{
        console.log(data)
        let empData:EmployeeDto[]=[]
        for(let i=0;i<data.length;i++)
        {
          empData.push(new EmployeeDto(data[i]))
        }
        this.employees=empData
        this.dummyData=empData
      }
    }
    )
    // let employeeData: Employee[]=data as Employee[];
    // console.log(employeeData);
    // let empData:EmployeeDto[]=[]
    // for(let i=0;i<employeeData.length;i++)
    // {
    //   let x=new Employee(employeeData[i]);
    //   let loc:string=(await firstValueFrom(await this.locationService.getLocationtById(x.LocationId)) as any).name as string;
    //   let role:string=(await firstValueFrom(await this.roleService.getRoleById(x.RoleId)) as any).name as string;
    //   let dept= (await firstValueFrom(await this.departmmentService.getDepartmentById(x.DepartmentId)) as any).name as string;
    //   empData.push(new EmployeeDto(x.Id,dept,x.FirstName,x.LastName,x.Email,x.JoiningDate,loc,role))
    //   console.log(empData);
    // }
  }

 
  generateAlphabets()
  {
    for(let i=65;i<91;i++)
    {
      this.alphabets.push(String.fromCharCode(i))
    }
  }

  
  receiveData(data:any,type:string):any{
    
    if(type=='status')
    {
      this.status=data.var1
    }
    else if(type=='Department')
    {
      this.departent=data.var1
    }
    else
    {
      this.loc=data.var1
    }
    var btn:HTMLButtonElement|null=document.querySelector('.apply-btn');
    btn?.classList.add('change-bg');
    btn?.classList.remove('apply-btn');
    
  }
  resetFiltersOnEmployees()
  {
    this.isDataFiltered=false
    if (this.statusRef) this.statusRef.resetValue();
    if (this.locationRef) this.locationRef.resetValue();
    if (this.departmentRef) this.departmentRef.resetValue();
    var btn:HTMLButtonElement|null=document.querySelector('.change-bg');
    btn?.classList.add('apply-btn');
    btn?.classList.remove('change-bg');
    this.employees=this.dummyData
    if(this.isAlphabetFilterApplied)
    {
      this.sortByAlphabet(this.aplhabet)
    }
  }
  async applyFilterOnEmployees()
  {
    if(this.isDataFiltered)
    {
      this.employees=this.dummyData
    }
    this.isDataFiltered=true
    let filteredData:EmployeeDto[]=[];
    for(var i=0;i<this.employees.length;i++)
    {
      if((this.departent==this.employees[i].Department || this.departent=='') && 
      (this.loc==this.employees[i].Location || this.loc==''))
      {
        filteredData.push(this.employees[i]);
      }
    }
    this.employees=filteredData;
    this.employeesData=filteredData;
  }
  sortByAlphabet(alphabet:string)
  {
    this.selectedItem=alphabet
    this.aplhabet=alphabet
    let filteredData:EmployeeDto[]=[];
    this.isAlphabetFilterApplied=true;
    if(this.isDataFiltered==false)
    {
       this.employees=this.dummyData
    }
    else{
      this.employees=this.employeesData;
    }
    for(var i=0;i<this.employees.length;i++)
    {
      if(this.employees[i].FirstName[0]==alphabet)
      {
        filteredData.push(this.employees[i]);
      }
    }
    this.employees=filteredData;
  }
  resetAlphabetFilter()
  {
    this.selectedItem=null;
    this.employees=this.dummyData
    if(this.isDataFiltered)
    {
      this.applyFilterOnEmployees()
    }
    this.isAlphabetFilterApplied=false
  }
  changeColour(event:any)
  {
    if(event[0]>0)
    {
      this.btnColourChange=true;
    }
    else
    {
      this.btnColourChange=false;
    }
  }

}
