import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async canActivate() {
    const token = await this.authService.getToken();
    if (token) {
      return true; // Token exists, allow access
    } else {
      this.router.navigate(['/login']); // No token, redirect to login
      return false;
    }
  }
}
