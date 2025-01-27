import { createAction, props } from '@ngrx/store';
import { AuthInitialState } from '../../types';

// Action to log in a user
export const login = createAction(
  '[Auth] Login', // Action type
  props<AuthInitialState>() // Payload with user and token
);

// Action to log out the user
export const logout = createAction('[Auth] Logout');

// Action to load the user from local storage or other sources (e.g., session)
export const loadUser = createAction(
  '[Auth] Load User',
  props<AuthInitialState>()
);
