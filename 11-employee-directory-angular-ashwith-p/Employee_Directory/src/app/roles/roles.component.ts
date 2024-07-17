import { Component, ViewChild } from '@angular/core';
import {RouterLink} from '@angular/router';
import { SelectdropdownComponent } from '../Common/selectdropdown/selectdropdown.component';
import { firstValueFrom } from 'rxjs';
import { Role } from '../../models/Role';
import { RoleService } from '../../services/roleService/role.service';
import { LocationService } from '../../services/locationService/location.service';
import { DepartentService } from '../../services/departmentService/departent.service';
import { RoleDTO } from '../../models/RoleDto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [RouterLink,SelectdropdownComponent,CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  roles:RoleDTO[]=[];
  dummyroles:any[]=[]
  departent=''
  loc=''
  departments:String[]=[]
  locations:String[]=[]
  @ViewChild('locationref') locationRef: SelectdropdownComponent | undefined;
  @ViewChild('departmentref') departmentRef: SelectdropdownComponent | undefined;
  

  constructor(private roleService:RoleService,private locationService:LocationService
    ,private departmentService:DepartentService,private router:Router){}

  async ngOnInit()
  {
  //   this.roles=[
  //   {
  //     Name:"Customer Service Manager",
  //     Location:"Chennai",
  //     Department:"Product Engg."
  //   },
  //   {
  //     Name:"Ux Designer",
  //     Location:"Banglore",
  //     Department:"UI/UX"
  //   },
  //   {
  //     Name:"Front-end Developer",
  //     Location:"Hyderabad",
  //     Department:"UI designer"
  //   }
  // ]
  var data:any= await firstValueFrom(await this.roleService.getAllRoles());
  let roleData: Role[]=data as Role[];
  console.log(roleData);

  for(let i=0;i<roleData.length;i++)
    {
      let x=new Role(roleData[i]);
      let loc:string=(await firstValueFrom(await this.locationService.getLocationtById((x.location)[0])) as any).name as string;
      let dept= (await firstValueFrom(await this.departmentService.getDepartmentById(x.Department)) as any).name as string;
      this.roles.push(new RoleDTO(x.Id,x.Name,dept,x.Description,loc))
 
    }
  this.dummyroles=this.roles;
  let locationModels:any[]=(await firstValueFrom(await this.locationService.getAllLocations()));
  for(let loc of locationModels)
  {
    this.locations.push(loc.name);
  }
  let departentModels:any[]=(await firstValueFrom(await this.departmentService.getAllDepartments()));
  for(let dept of departentModels)
  {
    this.departments.push(dept.name);
  }
  }
  receiveData(data:any,type:string):any{
    
   if(type=='Department')
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
    if (this.locationRef) this.locationRef.resetValue();
    if (this.departmentRef) this.departmentRef.resetValue();
    var btn:HTMLButtonElement|null=document.querySelector('.change-bg');
    btn?.classList.add('apply-btn');
    btn?.classList.remove('change-bg');
    this.roles=this.dummyroles
    this.departent=''
    this.loc=''
  }
  applyFilterOnEmployees()
  {
    
    let filteredData:any[]=[];
    for(var i=0;i<this.roles.length;i++)
    {
      if((this.departent==this.roles[i].Department || this.departent=='') && 
      (this.loc==this.roles[i].Location || this.loc==''))
      {
        filteredData.push(this.roles[i]);
      }
    }
    this.roles=filteredData;
    
  }
  getRoleDesc(event:Event)
  {
    let id=((event.target)as HTMLElement).parentElement?.parentElement?.id;
    this.router.navigate(['/role-desc',id])
  }
}
