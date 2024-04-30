import {
  LOGIN_PREFIX_SUCCESS_ACTION,
  LOGOUT_PREFIX_SUCCESS_ACTION,
  UPDATE_AUTH_DATA_ACTION
} from '../constants/login';

const initialState = {
  user: {},
  authChecked: false,
  isLoggedIn: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PREFIX_SUCCESS_ACTION:
      return {
        ...state,
        user: {...action.payload.user},
        isLoggedIn: true
      };
    case LOGOUT_PREFIX_SUCCESS_ACTION:
      return {
        ...state,
        user: {},
        isLoggedIn: false
      };
    case UPDATE_AUTH_DATA_ACTION:
      return {
        ...state,
        authChecked: action.payload.authChecked,
        isLoggedIn: action.payload.isLoggedIn,
        user: {...action.payload.user},
      };
    default:
      return state
  }
}
