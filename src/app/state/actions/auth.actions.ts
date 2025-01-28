import { createAction, props } from '@ngrx/store';
import { AuthInitialState } from '../../types';

export const login = createAction('[Auth] Login', props<AuthInitialState>());

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<AuthInitialState>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
