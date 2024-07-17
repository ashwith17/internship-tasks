import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  var route=inject(Router)
  var token=sessionStorage.getItem("token");
  req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
  return next(req).pipe(catchError((err) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        route.navigate(['login'])
      }
    }
    return throwError(() => err);
  }));
};
