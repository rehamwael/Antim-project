import { Action } from '@ngrx/store';

export enum FunderActionTypes {
  GET_ALL_REQUESTS = 'GetAllFunderRequests',
  SAVE_GET_ALL_REQUESTS = 'SaveAllFunderRequests',
  GET_ALL_REQUESTS_FAILURE = 'GetAllRequestsFailure',
  ADD_REQUEST = 'AddRequest',
  ADD_REQUEST_SUCCESS = 'AddRequestSuccess',
  SAVE_REQUEST_TYPE = 'SaveRequestType',
}


export class GetAllFunderRequests implements Action {
  readonly type = FunderActionTypes.GET_ALL_REQUESTS;
  constructor() { }
}
export class SaveAllFunderRequests implements Action {
  readonly type = FunderActionTypes.SAVE_GET_ALL_REQUESTS;
  constructor(public payload: any) { }
}

export class SaveRequestType implements Action {
  readonly type = FunderActionTypes.SAVE_REQUEST_TYPE;
  constructor(public payload: any) { }
}


export class GetAllRequestsFailure implements Action {
  readonly type = FunderActionTypes.GET_ALL_REQUESTS_FAILURE;
  constructor() {}
}
export class AddFunderRequest implements Action {
  readonly type = FunderActionTypes.ADD_REQUEST;
  constructor(public payload: any) { }
}
export class AddFunderRequestSuccess implements Action {
  readonly type = FunderActionTypes.ADD_REQUEST_SUCCESS;
  constructor(public payload: any) {}
}





export type FunderRequests =
  | GetAllFunderRequests
  | SaveAllFunderRequests
  | GetAllRequestsFailure
  | AddFunderRequest
  | AddFunderRequestSuccess
  | SaveRequestType;
