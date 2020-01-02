
import { User } from '../models/users';
import { AuthenticationActionTypes, AuthenticationActions } from '../actions/auth.actions';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  userProfile: any;
}

export const initialState: State = {
  isAuthenticated: false,
  // user: {
  //         token: localStorage.getItem('token'),
  //         role: localStorage.getItem('role')
  //       },
  user: null,
  userProfile: null,
};

export function reducer(state = initialState, action: AuthenticationActions): State {
  switch (action.type) {
    case AuthenticationActionTypes.LOGIN_SUCCESS: {
      // console.log(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          role: action.payload.role
        }
      };
    }
    case AuthenticationActionTypes.LOGIN_FAILURE: {
      return initialState;
    }
    case AuthenticationActionTypes.SAVE_USER_PROFILE: {
      // console.log(action.payload);
      return  {
        ...state,
        userProfile: action.payload,
        isAuthenticated: true
      };
    }
    case AuthenticationActionTypes.EDIT_USER_PROFILE: {
      let data = action.payload;
      state.userProfile.firstName = data.FirstName;
      // state.userProfile.email = data.Email;
      // state.userProfile.phoneNumber = data.PhoneNumber;
      // state.userProfile.nationalIdNumber = data.NationalIdNumber;
      let editedUser = state.userProfile;
      return {
            ...state,
            userProfile: editedUser
          };
    }
    case AuthenticationActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
