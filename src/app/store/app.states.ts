import { createFeatureSelector } from '@ngrx/store';
import * as authentication from './reducers/auth.reducers';
import * as customer from './reducers/customer.reducers';
import * as funder from './reducers/funder.reducers';

export interface AppState {
  authenticationState: authentication.State;
  customerRequestState: customer.State;
  funderRequestState: funder.State;
}

export const reducers =  {
  authentication: authentication.reducer,
  customer: customer.reducer,
  funder: funder.reducer
};

export const selectAuthenticationState = createFeatureSelector<AppState>('authentication');
export const customerState = createFeatureSelector<AppState>('customer');
export const funderState = createFeatureSelector<AppState>('funder');
