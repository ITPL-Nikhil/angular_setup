// src/app/state/reducers/index.ts (or similar)
import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth.reducer';
import { AppStoreState } from '../../types';

export const reducers: ActionReducerMap<AppStoreState> = {
  auth: authReducer,
};
