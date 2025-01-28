import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AuthService } from '../../core/services';
import { loginFailure, loginSuccess } from '../actions/auth.actions';
import { AppStoreState, UserDetailsType } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class EffectHandler {
  constructor(
    private store: Store<AppStoreState>,
    private authService: AuthService
  ) {}

  async callAllInitialEffect() {
    this.loadAuthData();
  }

  // Method to load authentication data (token and user)
  async loadAuthData(): Promise<void> {
    try {
      const token = await this.authService.getToken();
      if (token) {
        const user: UserDetailsType | null =
          await this.authService.getUserDetails();
        this.store.dispatch(loginSuccess({ token, user }));
      } else {
        this.store.dispatch(loginFailure({ error: 'No token found' }));
      }
    } catch (error: unknown) {
      // Type assertion to handle error as an instance of Error
      if (error instanceof Error) {
        this.store.dispatch(loginFailure({ error: error.message }));
      } else {
        this.store.dispatch(loginFailure({ error: 'Unknown error' }));
      }
    }
  }
}
