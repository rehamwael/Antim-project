
import { User } from '../models/users';
import { AuthenticationActionTypes, AuthenticationActions } from '../actions/auth.actions';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
  userProfile: any;
}

export const initialState: State = {
  isAuthenticated: localStorage.getItem('token') !== null,
  user: {
          token: localStorage.getItem('token'),
          role: localStorage.getItem('role')
        },
  errorMessage: null,
  userProfile: null
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
        },
        errorMessage: null
      };
    }
    case AuthenticationActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Wrong credentials.'
      };
    }
    case AuthenticationActionTypes.LOGOUT: {
      return initialState;
    }
    case AuthenticationActionTypes.SAVE_USER_PROFILE: {
      // console.log(action.payload);
      return  {
        ...state,
        userProfile: action.payload
      };
    }
    case AuthenticationActionTypes.EDIT_USER_PROFILE: {
      let data = action.payload;
      state.userProfile.firstName = data.FirstName;
      let editedUser = state.userProfile;
      return {
            ...state,
            userProfile: editedUser
          };
    }

    default: {
      return state;
    }
  }
}
