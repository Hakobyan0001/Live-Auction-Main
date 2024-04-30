import {loginRequest} from "../../services/REST/Login";
import baseRESTService from "../../services/REST/BaseRESTService";
import storage from "../../services/storage";
import history from "../../history";
import {error} from '../../helpers/notification';
import {
  LOGIN_PREFIX_REQUEST_ACTION,
  LOGIN_PREFIX_SUCCESS_ACTION,
  LOGIN_PREFIX_FAILURE_ACTION,
  LOGOUT_PREFIX_SUCCESS_ACTION,
  UPDATE_AUTH_DATA_ACTION
} from "../constants/login";

export function login({email, password}) {
  return async (dispatch) => {
    dispatch({type: LOGIN_PREFIX_REQUEST_ACTION});
    try {
      const response = await loginRequest({email, password});
      const user = JSON.stringify(response.data);
      storage.addItem('user', user);
      baseRESTService.setToken(response.data.token);
      history.push('/');
      dispatch({type: LOGIN_PREFIX_SUCCESS_ACTION, payload: {user: response.data.user}});
    } catch (err) {
      dispatch({type: LOGIN_PREFIX_FAILURE_ACTION});
      error(err?.response?.data?.message);
    }
  }
}

export function logout() {
  return (dispatch) => {
    storage.deleteItem('user');
    baseRESTService.setToken('');
    history.push('/login');
    dispatch({type: LOGOUT_PREFIX_SUCCESS_ACTION});
  }
}

export const updateAuthData = payload => {
  return dispatch => {
    const user = JSON.parse(storage.getItem('user'));

    let authData;
    if (user?.token) {
      baseRESTService.setToken(user.token);
      authData = {
        isLoggedIn: true,
        authChecked: true,
        user: user.user,
      };
    } else {
      baseRESTService.setToken('');
      authData = {
        isLoggedIn: false,
        token: '',
        authChecked: true,
        user: {}
      };
    }

    dispatch({
      type: UPDATE_AUTH_DATA_ACTION,
      payload: authData
    });
  };
};
