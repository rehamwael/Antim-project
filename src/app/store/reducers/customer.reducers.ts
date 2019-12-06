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
      // tslint:disable-next-line: prefer-const
      let data = action.payload;
      // tslint:disable-next-line: prefer-const
      let EditcustomerRequestsData = state.customerRequestsData.map(item => {
        // tslint:disable-next-line: triple-equals
        if (item.id == data.Id) {
          item.name = data.Name;
          item.totalPaybackAmount = data.TotalPaybackAmount;
          item.type = data.Type;
        }
        return item;
      });
      console.log(EditcustomerRequestsData);
      return {
        ...state,
        customerRequestsData: EditcustomerRequestsData
      };
    }

    // tslint:disable-next-line: no-switch-case-fall-through
    case CustomerActionTypes.DELETE_SUCCESS: {
      // console.log(action.payload);
      // tslint:disable-next-line: prefer-const
      let deleteRequest = state.customerRequestsData.filter(
        // tslint:disable-next-line: triple-equals
        item => item.id != action.payload.id);
      return {
        customerRequestsData: deleteRequest
      };
    }
  }
}
