import { createFeatureSelector } from '@ngrx/store';
import * as authentication from './reducers/auth.reducers';
import * as customer from './reducers/customer.reducers';

export interface AppState {
  authenticationState: authentication.State;
  customerRequestState: customer.State;
}

export const reducers =  {
  authentication: authentication.reducer,
  customer: customer.reducer
};

export const selectAuthenticationState = createFeatureSelector<AppState>('authentication');
export const customerState = createFeatureSelector<AppState>('customer');
