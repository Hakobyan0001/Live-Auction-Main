import { addBidRequest, updateBidRequest } from "../../services/REST/bid";
import { error, success } from "../../helpers/notification";
import {
  ADD_BID_REQUEST_ACTION,
  ADD_BID_SUCCESS_ACTION,
  ADD_BID_FAILURE_ACTION,
  UPDATE_BID_REQUEST_ACTION,
  UPDATE_BID_SUCCESS_ACTION,
  UPDATE_BID_FAILURE_ACTION,
} from "../constants/bid";

// ACTIONS /////////////////////////////////////////////////////////////////////
export function addBid(bid) {
  return async (dispatch) => {
    dispatch({ type: ADD_BID_REQUEST_ACTION });
    try {
      const response = await addBidRequest(bid);
      success("Bid added successfully");
      dispatch({
        type: ADD_BID_SUCCESS_ACTION,
        payload: response.data.data,
      });
    } catch (err) {
      dispatch({ type: ADD_BID_FAILURE_ACTION });
      error(err?.response?.data?.message);
    }
  };
}

export function updateBid(bid, id) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_BID_REQUEST_ACTION });
    try {
      const response = await updateBidRequest(bid, id);
      success("Bid updated successfully");
      dispatch({
        type: UPDATE_BID_SUCCESS_ACTION,
        payload: response.data.data,
      });
    } catch (err) {
      dispatch({ type: UPDATE_BID_FAILURE_ACTION });
      error(err?.response?.data?.message);
    }
  };
}
