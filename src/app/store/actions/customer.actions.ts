import { Action } from '@ngrx/store';

export enum CustomerActionTypes {
  GET_ALL_REQUESTS = 'GetAllCustomerRequests',
  SAVE_GET_ALL_REQUESTS = 'SaveAllCustomerRequests',
  ADD_REQUEST = 'AddRequest',
  EDIT_REQUEST = 'EditRequest',
  DELETE_REQUEST = 'DeleteRequest',
  DELETE_SUCCESS = 'DeleteRequestSuccess'
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
  | EditCustomerRequest
  | DeleteCustomerRequests
  | DeleteRequestSuccess;
