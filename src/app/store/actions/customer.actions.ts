import { Action } from '@ngrx/store';

export enum CustomerActionTypes {
  GET_ALL_REQUESTS = 'GetAllCustomerRequests',
  SAVE_GET_ALL_REQUESTS = 'SaveAllCustomerRequests',
  ADD_REQUEST = 'AddRequest',
  ADD_REQUEST_SUCCESS = 'AddRequestSuccess',
  EDIT_REQUEST = 'EditRequest',
  DELETE_REQUEST = 'DeleteRequest',
  DELETE_SUCCESS = 'DeleteRequestSuccess',
  IS_UPDATED_FALSE = 'IsUpdatedFalse',
  IS_UPDATED_TRUE = 'IsUpdatedTrue',
  IS_API_CALL_TRUE = 'IsApiCallTrue',
  IS_API_CALL_FALSE = 'IsApiCallFalse'
}

export class IsApiCallTrue implements Action {
  readonly type = CustomerActionTypes.IS_API_CALL_TRUE;
  constructor() { }
}
export class IsApiCallFalse implements Action {
  readonly type = CustomerActionTypes.IS_API_CALL_FALSE;
  constructor() { }
}
export class IsUpdatedFalse implements Action {
  readonly type = CustomerActionTypes.IS_UPDATED_FALSE;
  constructor() { }
}
export class IsUpdatedTrue implements Action {
  readonly type = CustomerActionTypes.IS_UPDATED_TRUE;
  constructor() { }
}
export class GetAllCustomerRequests implements Action {
  readonly type = CustomerActionTypes.GET_ALL_REQUESTS;
  constructor() { }
}
export class SaveAllCustomerRequests implements Action {
  readonly type = CustomerActionTypes.SAVE_GET_ALL_REQUESTS;
  constructor(public payload: any) { }
}
export class AddCustomerRequest implements Action {
  readonly type = CustomerActionTypes.ADD_REQUEST;
  constructor(public payload: any) { }
}
export class AddCustomerRequestSuccess implements Action {
  readonly type = CustomerActionTypes.ADD_REQUEST_SUCCESS;
  constructor(public payload: any) {}
}

export class EditCustomerRequest implements Action {
  readonly type = CustomerActionTypes.EDIT_REQUEST;
  constructor(public payload: any) { }
}
export class DeleteCustomerRequests implements Action {
  readonly type = CustomerActionTypes.DELETE_REQUEST;
  constructor(public payload: any) { }
}
export class DeleteRequestSuccess implements Action {
  readonly type = CustomerActionTypes.DELETE_SUCCESS;
  constructor(public payload: any) { }
}


export type CustomerRequests =
  | GetAllCustomerRequests
  | SaveAllCustomerRequests
  | AddCustomerRequest
  | AddCustomerRequestSuccess
  | EditCustomerRequest
  | DeleteCustomerRequests
  | DeleteRequestSuccess
  | IsUpdatedFalse
  | IsApiCallFalse
  | IsApiCallTrue
  | IsUpdatedTrue;
