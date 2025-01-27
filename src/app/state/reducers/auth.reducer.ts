import { createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/auth.actions';
import { AuthInitialState } from '../../types';

// Function to safely retrieve the token from localStorage
function getTokenFromLocalStorage(): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('auth_token');
    return token;
  }
  return null;
}

export const initialState: AuthInitialState = {
  user: null,
  token: getTokenFromLocalStorage(), // Use the safe function to get token
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { user, token }) => ({
    ...state,
    user,
    token,
  })),
  on(logout, () => ({
    ...initialState,
  }))
);
