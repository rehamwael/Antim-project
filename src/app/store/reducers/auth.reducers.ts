
import { User } from '../models/users';
import { AuthenticationActionTypes, AuthenticationActions } from '../actions/auth.actions';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  userProfile: any;
  loggedIn: boolean;
  totalUnReadNotifications: any;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  userProfile: null,
  loggedIn: false,
  totalUnReadNotifications: 0
};

export function reducer(state = initialState, action: AuthenticationActions): State {
  switch (action.type) {
    case AuthenticationActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        loggedIn: true,
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
    case AuthenticationActionTypes.SAVE_TOTAL_NOTIFICATIONS: {
      return  {
        ...state,
        totalUnReadNotifications: action.payload,
      };
    }
    case AuthenticationActionTypes.READ_NOTIFICATION: {
      return  {
        ...state,
        totalUnReadNotifications: state.totalUnReadNotifications - action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
