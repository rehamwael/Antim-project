import { StaticPages, StaticPagesActionTypes } from '../actions/static-pages.actions';

export interface State {
  HomePage: any;
  WhoWeArePage: any;
  LenderPage: any;
  BorrowerPage: any;
  ContactUsPage: any;
}

export const initialState: State = {
  HomePage: null,
  WhoWeArePage: null,
  LenderPage: null,
  BorrowerPage: null,
  ContactUsPage: null
};

export function reducer(state = initialState, action: StaticPages): State {
  switch (action.type) {
    case StaticPagesActionTypes.SAVE_HOME_PAGE: {
      return {
        ...state,
        HomePage: action.payload,
      };
    }
    case StaticPagesActionTypes.SAVE_WHO_WE_ARE_PAGE: {
      return {
        ...state,
        WhoWeArePage: action.payload,
      };
    }
    case StaticPagesActionTypes.SAVE_BORROWER_PAGE: {
      return {
        ...state,
        BorrowerPage: action.payload,
      };
    }
    case StaticPagesActionTypes.SAVE_LENDER_PAGE: {
      return {
        ...state,
        LenderPage: action.payload,
      };
    }
    case StaticPagesActionTypes.SAVE_CONTACT_US_PAGE: {
      return {
        ...state,
        ContactUsPage: action.payload,
      };
    }

    default: {
      return state;
    }

  }
}
