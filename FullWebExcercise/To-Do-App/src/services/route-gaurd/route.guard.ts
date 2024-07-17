import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const routeGuard: CanActivateFn = (route,state) => {
  let router=inject(Router);
  let token=sessionStorage.getItem("token");
  if(token)
  {
    return true
  }
  else{
    router.navigate(['login']);
    return false;
  }

};
