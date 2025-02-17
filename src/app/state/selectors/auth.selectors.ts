import { createSelector } from '@ngrx/store';
import { AppStoreState, AuthInitialState } from '../../types';

// Update the selector to use the typed state
export const selectAuthState = (state: AppStoreState) => state.auth; // Access the auth state

// Selector for the user
export const selectUser = createSelector(
  selectAuthState,
  (authState: AuthInitialState) => authState?.user ?? null
);

// Selector for the token
export const selectToken = createSelector(
  selectAuthState,
  (authState: AuthInitialState) => authState?.token ?? null
);

// Selector for the token
export const selectIsLoading = createSelector(
  selectAuthState,
  (authState: AuthInitialState) => authState?.isLoading ?? false
);
