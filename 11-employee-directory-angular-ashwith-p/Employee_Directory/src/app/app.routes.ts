import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { RolesComponent } from './roles/roles.component';
import { RoleDescComponent } from './role-desc/role-desc.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { AddroleComponent } from './addrole/addrole.component';

export const routes: Routes = [
    { path: '', component: EmployeesComponent },
    { path: 'roles', component: RolesComponent },
    { path: 'role-desc/:id', component: RoleDescComponent },
    { path:  'add-employee', component: AddemployeeComponent,
    children: [
        { path: 'view/:id', component: AddemployeeComponent },
        { path: 'edit/:id', component: AddemployeeComponent }]},
    { path:  'add-role', component: AddroleComponent}
    
];
