import { Action } from '@ngrx/store';

export enum CustomerActionTypes {
  GET_ALL_REQUESTS = 'GetAllCustomerRequests',
  SAVE_GET_ALL_REQUESTS = 'SaveAllCustomerRequests',
  GET_ALL_REQUESTS_FAILURE = 'GetAllRequestsFailure',

  ADD_REQUEST = 'AddCustomerRequest',
  // ADD_REQUEST_SUCCESS = 'AddCustomerRequestSuccess',

  EDIT_REQUEST = 'EditRequest',
  DELETE_REQUEST = 'DeleteRequest',
  DELETE_SUCCESS = 'DeleteRequestSuccess',
  DELETE_DRAFT_REQUEST = 'DeleteDraftRequest',
  IS_UPDATED_FALSE = 'IsUpdatedFalse',
  IS_UPDATED_TRUE = 'IsUpdatedTrue',
  IS_API_CALL_TRUE = 'IsApiCallTrue',
  IS_API_CALL_FALSE = 'IsApiCallFalse',
  REMOVE_REQUESTS_FROM_STORE = 'RemoveRequestsFromStore',
  GET_REQUESTS_COUNT = 'GetRequestsCount',
  GET_REQUESTS_COUNT_SUCCESS = 'GetRequestsCountSuccess'
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
export class GetAllRequestsFailure implements Action {
  readonly type = CustomerActionTypes.GET_ALL_REQUESTS_FAILURE;
  constructor() {}
}
export class AddCustomerRequest implements Action {
  readonly type = CustomerActionTypes.ADD_REQUEST;
  constructor(public payload: any) { }
}
// export class AddCustomerRequestSuccess implements Action {
//   readonly type = CustomerActionTypes.ADD_REQUEST_SUCCESS;
//   constructor(public payload: any) {}
// }

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
export class DeleteDraftRequest implements Action {
  readonly type = CustomerActionTypes.DELETE_DRAFT_REQUEST;
  constructor(public payload: any) { }
}
export class RemoveRequestsFromStore implements Action {
  readonly type = CustomerActionTypes.REMOVE_REQUESTS_FROM_STORE;
}
export class GetCustomerRequestCount implements Action {
  readonly type = CustomerActionTypes.GET_REQUESTS_COUNT;
  constructor() {}
}
export class GetRequestsCountSuccess implements Action {
  readonly type = CustomerActionTypes.GET_REQUESTS_COUNT_SUCCESS;
  constructor(public payload: any) {}
}



export type CustomerRequests =
  | GetAllCustomerRequests
  | SaveAllCustomerRequests
  | GetAllRequestsFailure
  | AddCustomerRequest
  // | AddCustomerRequestSuccess
  | EditCustomerRequest
  | DeleteCustomerRequests
  | DeleteRequestSuccess
  | DeleteDraftRequest
  | IsUpdatedFalse
  | IsApiCallFalse
  | IsApiCallTrue
  | IsUpdatedTrue
  | RemoveRequestsFromStore
  | GetCustomerRequestCount
  | GetRequestsCountSuccess;

