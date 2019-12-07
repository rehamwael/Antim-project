import { CustomerActionTypes, CustomerRequests } from '../actions/customer.actions';

export interface State {
  customerRequestsData: any[];
}

export const initialState: State = {
  customerRequestsData: null,
};

export function reducer(state = initialState, action: CustomerRequests): State {
  switch (action.type) {
    case CustomerActionTypes.SAVE_GET_ALL_REQUESTS: {
      return {
        ...state,
        customerRequestsData: action.payload
      };
    }
    case CustomerActionTypes.ADD_REQUEST: {
      // console.log(action.payload);
      return {
        ...state,
        customerRequestsData: [...state.customerRequestsData, action.payload],
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
        customerRequestsData: EditcustomerRequestsData
      };
    }
    case CustomerActionTypes.DELETE_SUCCESS: {
      let deletedRequest = state.customerRequestsData.filter(
        item => item.id != action.payload.id);
      return {
        customerRequestsData: deletedRequest
      };
    }
  }
}
