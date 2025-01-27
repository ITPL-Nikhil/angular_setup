// auth.interceptor.ts (modified to handle 401 errors)

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = localStorage.getItem('authToken');

    let clonedRequest = req;

    if (authToken && authToken !== '') {
      clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Redirect to login page if token is invalid or expired
          this.router.navigate(['/login']);
        }
        return throwError(error); // Return the error for further handling
      })
    );
  }
}
