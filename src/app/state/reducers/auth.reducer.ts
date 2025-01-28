import { createReducer, on } from '@ngrx/store';

import { AuthInitialState } from '../../types';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
} from '../actions/auth.actions';

export const initialState: AuthInitialState = {
  user: null,
  token: null,
  error: null,
  isLoading: true,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    isLoading: false, // Set isLoading to true when login starts
  })),
  on(loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    error: null,
    isLoading: false,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(logout, () => initialState)
);
