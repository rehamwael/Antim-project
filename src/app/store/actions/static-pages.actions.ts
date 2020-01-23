import { Action } from '@ngrx/store';

export enum StaticPagesActionTypes {
  GET_HOME_PAGE = 'GetHomePage',
  SAVE_HOME_PAGE = 'SaveHomePage',
  GET_WHO_WE_ARE_PAGE = 'GetWhoWeArePage',
  SAVE_WHO_WE_ARE_PAGE = 'SaveWhoWeArePage',
  GET_LENDER_PAGE = 'GetLenderPage',
  SAVE_LENDER_PAGE = 'SaveLenderPage',
  GET_BORROWER_PAGE = 'GetBorrowerPage',
  SAVE_BORROWER_PAGE = 'SaveBorrowerPage',
  GET_CONTACT_US_PAGE = 'GetContactUsPage',
  SAVE_CONTACT_US_PAGE = 'SaveContactUsPage',
}


export class GetHomePage implements Action {
  readonly type = StaticPagesActionTypes.GET_HOME_PAGE;
  constructor() { }
}
export class SaveHomePage implements Action {
  readonly type = StaticPagesActionTypes.SAVE_HOME_PAGE;
  constructor(public payload: any) { }
}

export class GetWhoWeArePage implements Action {
  readonly type = StaticPagesActionTypes.GET_WHO_WE_ARE_PAGE;
  constructor() { }
}
export class SaveWhoWeArePage implements Action {
  readonly type = StaticPagesActionTypes.SAVE_WHO_WE_ARE_PAGE;
  constructor(public payload: any) { }
}

export class GetLenderPage implements Action {
  readonly type = StaticPagesActionTypes.GET_LENDER_PAGE;
  constructor() { }
}
export class SaveLenderPage implements Action {
  readonly type = StaticPagesActionTypes.SAVE_LENDER_PAGE;
  constructor(public payload: any) { }
}

export class GetBorrowerPage implements Action {
  readonly type = StaticPagesActionTypes.GET_BORROWER_PAGE;
  constructor() { }
}
export class SaveBorrowerPage implements Action {
  readonly type = StaticPagesActionTypes.SAVE_BORROWER_PAGE;
  constructor(public payload: any) { }
}

export class GetContactUsPage implements Action {
  readonly type = StaticPagesActionTypes.GET_CONTACT_US_PAGE;
  constructor() { }
}
export class SaveContactUsPage implements Action {
  readonly type = StaticPagesActionTypes.SAVE_CONTACT_US_PAGE;
  constructor(public payload: any) { }
}

export type StaticPages =
  | GetHomePage
  | SaveHomePage
  | GetWhoWeArePage
  | SaveWhoWeArePage
  | GetLenderPage
  | SaveLenderPage
  | GetBorrowerPage
  | SaveBorrowerPage
  | GetContactUsPage
  | SaveContactUsPage;
