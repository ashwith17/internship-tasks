import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ProjectService } from '../../services/projectService/project.service';
import { RoleDescComponent } from '../role-desc/role-desc.component';
import { RoleService } from '../../services/roleService/role.service';
import { DepartentService } from '../../services/departmentService/departent.service';
import { LocationService } from '../../services/locationService/location.service';
import { EmployeeService } from '../../services/employeeService/employee.service';
import { Employee } from '../../models/Employee';
import {  ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

const idLengthValidator: ValidatorFn = (control: AbstractControl): {[key: string]: any} | null => {
  const id = control.value;
  return id? id.length === 6? null : {'idTooShort': true} : null;
};

const ageGreaterThan18Validator: ValidatorFn = (control: AbstractControl): {[key: string]: any} | null => {
  const dob = control.get('DateOfBirth')?.value;
  if (!dob) return null; // Date of Birth is not required, so return null if empty

  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();

  if (birthDate.getMonth() > today.getMonth() || (birthDate.getMonth() === today.getMonth() && birthDate.getDate() > today.getDate())) {
    age--;
  }
  if(age<=18)
  {
    return {'ageLessThan18': true};
  }
  return null;
};

@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css'
})


export class AddemployeeComponent {
  customForm: FormGroup;
  locations: any[]=[]; // Declare this if it exists
  roles: any[]=[]; // Declare this if it exists
  departments: any[]=[]; // Declare this if it exists
  projects: any[]=[];
  Url:string='';

  
  async ngOnInit()
  {
    this.projectService.getProjects().subscribe({
      next:(data)=>this.projects=data
    })
    this.roleService.getAllRoles().subscribe({
      next:(data)=>this.roles=data
    })
    this.departmentService.getAllDepartments().subscribe({
      next:(data)=>this.departments=data
    })
    this.locationService.getAllLocations().subscribe({
      next:(data)=>this.locations=data
    })
    console.log(this.route.url)
    this.Url=(this.route.url).toString();
    console.log(this.Url);
    if(this.Url!='/add-employee')
    {
      const id :string=this.Url.substring(this.Url.length - 6);
      let employee:Employee=await firstValueFrom(await this.employeeService.getEmployeeById(id));
      employee=new Employee(employee);
      console.log(employee);
      this.setEmployeeValues(employee)
      if(this.Url.includes("view"))
      {
        this.customForm.get("id")?.disable();
        this.customForm.get("firstName")?.disable();
        this.customForm.get("lastName")?.disable();
        this.customForm.get("dateOfBirth")?.disable();
        this.customForm.get("email")?.disable();
        this.customForm.get("joiningDate")?.disable();
        this.customForm.get("departmentId")?.disable();
        this.customForm.get("locationId")?.disable();
        this.customForm.get("roleId")?.disable();
        this.customForm.get("mobileNumber")?.disable();
        this.customForm.get("managerId")?.disable();
        this.customForm.get("projectId")?.disable();
      }
      else
      {
        this.customForm.get("id");
        this.customForm.get("firstName");
        this.customForm.get("lastName");
        this.customForm.get("dateOfBirth");
        this.customForm.get("email");
        this.customForm.get("joiningDate");
        this.customForm.get("departmentId");
        this.customForm.get("locationId");
        this.customForm.get("roleId");
        this.customForm.get("mobileNumber");
        this.customForm.get("managerId");
        this.customForm.get("projectId");
      }
    }

  }
  constructor(private fb: FormBuilder,private projectService:ProjectService,private roleService:RoleService,private router:ActivatedRoute,
    private departmentService:DepartentService,private locationService:LocationService,private employeeService:EmployeeService,private route:Router) {
    this.customForm = this.fb.group({
      id: ['', [Validators.required, idLengthValidator]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['',[ageGreaterThan18Validator]],
      email: ['', [Validators.required, Validators.email]],
      joiningDate: ['', Validators.required],
      departmentId: ['', Validators.required],
      locationId: ['', Validators.required],
      roleId: ['', Validators.required],
      mobileNumber: [null],
      managerId: [null],
      projectId: [null]
    }, {validators: ageGreaterThan18Validator});
  }



  onSubmit() {
    if (this.customForm.valid) {
      console.log(this.customForm.value);
      const emp=new Employee(this.customForm.value)
      emp.DateOfBirth=emp.DateOfBirth?.split("-").reverse().join("/");
      emp.JoiningDate=emp.JoiningDate.split("-").reverse().join("/");
      if(this.Url=='/add-employee')
      {
        this.employeeService.addEmployee(emp).subscribe({
          complete:()=>this.route.navigateByUrl('/')
        });
        console.log(emp);
      }
      else if(this.Url.includes("edit"))
      {
        this.employeeService.updateEmployee(emp).subscribe({
          next:(data)=>console.log(data),
          complete:()=>this.route.navigateByUrl('/')
        })
      }
    } 
    else {
      console.log('Form is invalid');
    }
  }
  setEmployeeValues(emp:Employee)
  {
    this.customForm.setValue({
      id:emp.Id,
      firstName:emp.FirstName,
      lastName:emp.LastName,
      email:emp.Email,
      dateOfBirth:emp.DateOfBirth,
      joiningDate:emp.JoiningDate,
      mobileNumber:emp.MobileNumber?'':emp.MobileNumber,
      projectId:emp.ProjectId,
      managerId:emp.ManagerId,
      departmentId:emp.DepartmentId,
      roleId:emp.RoleId,
      locationId:emp.LocationId
    })
  }

  navigate()
  {
    this.route.navigate(['/']);
  }
  
}
