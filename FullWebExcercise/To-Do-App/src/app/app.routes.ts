import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { routeGuard } from '../services/route-gaurd/route.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActiveComponent } from './active/active.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {path:"login",component:AuthenticationComponent},

    {path:"signup",component:AuthenticationComponent},
    
    {
        path:"",
        component:HomeComponent,
        canActivate:[routeGuard],
        children:[
            {path:'dashboard',component:DashboardComponent,canActivate:[routeGuard]},
            {path:'active',component:ActiveComponent,canActivate:[routeGuard]},
            {path:'completed',component:ActiveComponent,canActivate:[routeGuard]}
        ]
    },
    {
        path:"**",
        redirectTo:'login'
    }


];
