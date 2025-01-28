import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, take, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  selectIsLoading,
  selectToken,
} from '../../../state/selectors/auth.selectors';
import { AppStoreState } from '../../../types';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AppStoreState>,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsLoading).pipe(
      filter((isLoading) => !isLoading), // Wait until loading is false
      take(1), // Only take the first value from isLoading
      switchMap(() =>
        this.store.select(selectToken).pipe(
          take(1), // Take the first emitted value from the token observable
          map((token) => {
            if (token) {
              return true; // Token exists, allow access
            } else {
              this.router.navigate(['/login']); // No token, redirect to login
              return false;
            }
          })
        )
      )
    );
  }
}
