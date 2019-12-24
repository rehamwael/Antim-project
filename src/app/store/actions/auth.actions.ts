import { Action } from '@ngrx/store';

export enum AuthenticationActionTypes {
  LOGIN = '[Authentication] Login',
  LOGIN_SUCCESS = '[Authentication] Login Success',
  LOGIN_FAILURE = '[Authentication] Login Failure',
  LOGOUT = '[Authentication] Logout',
  USER_PROFILE = 'userProfile',
  SAVE_USER_PROFILE = 'saveUserProfile',
  EDIT_USER_PROFILE = 'editUserProfile',
}

export class Login implements Action {
  readonly type = AuthenticationActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthenticationActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LoginFailure implements Action {
  readonly type = AuthenticationActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthenticationActionTypes.LOGOUT;
}
export class UserProfile implements Action {
  readonly type = AuthenticationActionTypes.USER_PROFILE;
  constructor() {}
}
export class SaveUserProfile implements Action {
  readonly type = AuthenticationActionTypes.SAVE_USER_PROFILE;
  constructor(public payload: any) {}
}
export class EditUserProfile implements Action {
  readonly type = AuthenticationActionTypes.EDIT_USER_PROFILE;
  constructor(public payload: any) {}
}


export type AuthenticationActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | UserProfile
  | SaveUserProfile
  | EditUserProfile;
