import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Convert the Promise returned by getToken() to an Observable using 'from'
    return from(this.authService.getToken()).pipe(
      switchMap((authToken: string | null) => {
        let clonedRequest = req;

        if (authToken && authToken !== '') {
          clonedRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${authToken}`,
            },
          });
        }

        return next.handle(clonedRequest); // Proceed with the HTTP request
      }),
      catchError((error) => {
        if (error.status === 401) {
          // Redirect to login page if token is invalid or expired
          this.authService.logout();
        }
        return throwError(error); // Return the error for further handling
      })
    );
  }
}
