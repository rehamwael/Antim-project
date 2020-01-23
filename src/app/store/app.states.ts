import { createFeatureSelector } from '@ngrx/store';
import * as authentication from './reducers/auth.reducers';
import * as customer from './reducers/customer.reducers';
import * as funder from './reducers/funder.reducers';
import * as staticPages from './reducers/static-pages.reducers';

export interface AppState {
  authenticationState: authentication.State;
  customerRequestState: customer.State;
  funderRequestState: funder.State;
  staticPagesState: staticPages.State;
}

export const reducers =  {
  authentication: authentication.reducer,
  customer: customer.reducer,
  funder: funder.reducer,
  staticPages: staticPages.reducer
};

export const selectAuthenticationState = createFeatureSelector<AppState>('authentication');
export const customerState = createFeatureSelector<AppState>('customer');
export const funderState = createFeatureSelector<AppState>('funder');
export const staticPagesState = createFeatureSelector<AppState>('staticPages');
