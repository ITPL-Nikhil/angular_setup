import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from '../localStorage/localStorage.service';
import { LOCAL_STORAGE_KEYS } from '../../utils';
import { Store } from '@ngrx/store';
import { AppStoreState } from '../../../types';
import { logout } from '../../../state/actions/auth.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private store: Store<AppStoreState>,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  // Method to get the token from local storage (only in browser)
  async getToken(): Promise<string | null> {
    return await this.localStorageService.fetchLocalData({
      key: LOCAL_STORAGE_KEYS.token,
    });
  }

  // Method to store the token in local storage (only in browser)
  async setToken<T>(token: T): Promise<void> {
    await this.localStorageService.storeLocalData({
      key: LOCAL_STORAGE_KEYS.token,
      value: token,
    });
  }

  // Method to remove the token (only in browser)
  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
    }
  }

  // Method to check if the user is authenticated (token exists)
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Method to get the token from local storage (only in browser)
  async getUserDetails<T>(): Promise<T | null> {
    return await this.localStorageService.fetchLocalData({
      key: LOCAL_STORAGE_KEYS.userDetails,
    });
  }

  // Method to store the token in local storage (only in browser)
  async setUserDetails<T>(value: T): Promise<void> {
    await this.localStorageService.storeLocalData({
      key: LOCAL_STORAGE_KEYS.userDetails,
      value: value,
    });
  }
  logout() {
    this.store.dispatch(logout());
    // Optionally, clear the token from localStorage
    this.localStorageService.clearLocalStorage({});
    this.router.navigate(['login']);
  }
}
