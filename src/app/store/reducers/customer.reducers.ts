import { CustomerActionTypes, CustomerRequests } from '../actions/customer.actions';

export interface State {
  customerRequestsData: any[];
  isUpdated: Boolean;
  isApiCall: Boolean;
  requestsArrayIsEmpty: Boolean;
  customerRequestCount: any;
}

export const initialState: State = {
  customerRequestsData: [],
  isUpdated: false,
  isApiCall: false,
  requestsArrayIsEmpty: null,
  customerRequestCount: null
};

export function reducer(state = initialState, action: CustomerRequests): State {
  switch (action.type) {
    case CustomerActionTypes.SAVE_GET_ALL_REQUESTS: {
      return {
        ...state,
        customerRequestsData: action.payload,
        requestsArrayIsEmpty: false
      };
    }
    case CustomerActionTypes.GET_ALL_REQUESTS_FAILURE: {
      return {
        ...state,
        requestsArrayIsEmpty: true,
        customerRequestsData: [],
        isApiCall: true
      };
    }
    case CustomerActionTypes.IS_UPDATED_TRUE: {
      return {
        ...state,
        isUpdated: true
      };
    }
    case CustomerActionTypes.IS_UPDATED_FALSE: {
      return {
        ...state,
        isUpdated: false
      };
    }
    case CustomerActionTypes.IS_API_CALL_TRUE: {
      return {
        ...state,
        isApiCall: true
      };
    }
    case CustomerActionTypes.IS_API_CALL_FALSE: {
      return {
        ...state,
        isApiCall: false
      };
    }
    case CustomerActionTypes.GET_ALL_REQUESTS_FAILURE: {
      return initialState;
    }

    case CustomerActionTypes.ADD_REQUEST_SUCCESS: {
      console.log(action.payload);
      let data = action.payload;
      let AddcustomerRequestsData = [data, ...state.customerRequestsData ];
      return {
        ...state,
        customerRequestsData: AddcustomerRequestsData,
      };
    }
    case CustomerActionTypes.GET_REQUESTS_COUNT_SUCCESS: {
      return {
        ...state,
        customerRequestCount: action.payload
      };
    }


    case CustomerActionTypes.EDIT_REQUEST: {
      let data = action.payload;
      let EditcustomerRequestsData = state.customerRequestsData.map(item => {
        if (item.id == data.Id) {
          item.name = data.Name;
          item.totalPaybackAmount = data.TotalPaybackAmount;
          item.type = data.Type;
        }
        return item;
      });
      return {
        ...state,
        customerRequestsData: EditcustomerRequestsData,
      };
    }
    case CustomerActionTypes.DELETE_SUCCESS: {
      let deletedRequest = state.customerRequestsData.filter(
        item => item.id != action.payload.id);
      return {
        ...state,
        customerRequestsData: deletedRequest,
      };
    }
    case CustomerActionTypes.REMOVE_REQUESTS_FROM_STORE: {
      console.log(initialState);
      return initialState;
    }

    default: {
      return state;
    }

  }
}
