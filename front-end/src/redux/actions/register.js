import {registerRequest} from "../../services/REST/Register";
import {
  REGISTER_PREFIX_REQUEST_ACTION,
  REGISTER_PREFIX_SUCCESS_ACTION,
  REGISTER_PREFIX_FAILURE_ACTION
} from "../constants/register";
import {error, success} from "../../helpers/notification";

export function register(data) {
  return async (dispatch) => {
    dispatch({type: REGISTER_PREFIX_REQUEST_ACTION});
    try {
      const response = await registerRequest(data);
      success(response.data.message);
      dispatch({type: REGISTER_PREFIX_SUCCESS_ACTION});
    } catch (err) {
      dispatch({type: REGISTER_PREFIX_FAILURE_ACTION});
      error(err?.response?.data?.message);
    }
  }
}
