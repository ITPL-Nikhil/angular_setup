import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectToken } from '../../../state/selectors/auth.selectors';
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
    return this.store.select(selectToken).pipe(
      map((token) => {
        if (token) {
          return true; // Token exists, allow access
        } else {
          this.router.navigate(['/login']); // No token, redirect to login
          return false;
        }
      })
    );
  }
}
