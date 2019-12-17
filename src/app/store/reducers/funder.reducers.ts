import { FunderActionTypes, FunderRequests } from '../actions/funder.actions';

export interface State {
  funderRequestsData: any[];
  requestType: any;
}

export const initialState: State = {
  funderRequestsData: [],
  requestType: null
};

export function reducer(state = initialState, action: FunderRequests): State {
  switch (action.type) {
    case FunderActionTypes.SAVE_GET_ALL_REQUESTS: {
      return {
        ...state,
        funderRequestsData: action.payload,
      };
    }
    case FunderActionTypes.GET_ALL_REQUESTS_FAILURE: {
      return {
        ...state,
        funderRequestsData: [],
      };
    }
    case FunderActionTypes.ADD_REQUEST_SUCCESS: {
      console.log(action.payload);
      let data = action.payload;
      let AddfunderRequestsData = [data, ...state.funderRequestsData ];
      return {
        ...state,
        funderRequestsData: AddfunderRequestsData,
      };
    }
    case FunderActionTypes.SAVE_REQUEST_TYPE: {
      console.log(action.payload);
      return {
        ...state,
        requestType: action.payload,
      };
    }

    default: {
      return state;
    }

  }
}
