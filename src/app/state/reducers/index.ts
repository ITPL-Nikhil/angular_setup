// src/app/state/reducers/index.ts (or similar)
import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth.reducer';
import { AuthInitialState } from '../../types';

export interface AppState {
  auth: AuthInitialState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
};
