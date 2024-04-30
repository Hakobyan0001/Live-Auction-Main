import {
  getItemsRequest,
  getItemRequest,
  addItemRequest,
  updateItemRequest,
  deleteItemRequest,
} from "../../services/REST/Items";
import { error, success } from "../../helpers/notification";
import {
  GET_ITEMS_REQUEST_ACTION,
  GET_ITEMS_SUCCESS_ACTION,
  GET_ITEMS_FAILURE_ACTION,
  GET_ITEM_DETAILS_REQUEST_ACTION,
  GET_ITEM_DETAILS_SUCCESS_ACTION,
  GET_ITEM_DETAILS_FAILURE_ACTION,
  ADD_ITEM_REQUEST_ACTION,
  ADD_ITEM_SUCCESS_ACTION,
  ADD_ITEM_FAILURE_ACTION,
  UPDATE_ITEM_REQUEST_ACTION,
  UPDATE_ITEM_SUCCESS_ACTION,
  UPDATE_ITEM_FAILURE_ACTION,
  DELETE_ITEM_REQUEST_ACTION,
  DELETE_ITEM_SUCCESS_ACTION,
  DELETE_ITEM_FAILURE_ACTION,
  TOGGLE_MODAL_ACTION,
} from "../constants/items";

// ACTIONS /////////////////////////////////////////////////////////////////////
export function getItems(params) {
  return async (dispatch, getState) => {
    dispatch({ type: GET_ITEMS_REQUEST_ACTION });
    const { user } = getState().login;
    if (user?.role === "admin") {
      params.id = user.id;
    }
    try {
      const response = await getItemsRequest(params);
      const { count, rows, total } = response.data.data;
      dispatch({
        type: GET_ITEMS_SUCCESS_ACTION,
        payload: { count, rows, total },
      });
    } catch (err) {
      dispatch({ type: GET_ITEMS_FAILURE_ACTION });
      error(err?.response?.data?.message);
    }
  };
}

export function getItem(id) {
  return async (dispatch) => {
    dispatch({ type: GET_ITEM_DETAILS_REQUEST_ACTION });
    try {
      const response = await getItemRequest(id);
      const item = response.data.data;
      dispatch({
        type: GET_ITEM_DETAILS_SUCCESS_ACTION,
        payload: item,
      });
    } catch (err) {
      dispatch({ type: GET_ITEM_DETAILS_FAILURE_ACTION });
      error(err?.response?.data?.message);
    }
  };
}

export function addItem(item) {
  return async (dispatch) => {
    dispatch({ type: ADD_ITEM_REQUEST_ACTION });
    try {
      const response = await addItemRequest(item);
      success("Item added successfully");
      dispatch({
        type: ADD_ITEM_SUCCESS_ACTION,
        payload: response.data.data,
      });
    } catch (err) {
      dispatch({ type: ADD_ITEM_FAILURE_ACTION });
      error(err?.response?.data?.message);
    }
  };
}

export function deleteItem(id) {
  return async (dispatch) => {
    dispatch({ type: DELETE_ITEM_REQUEST_ACTION });
    try {
      const response = await deleteItemRequest(id);
      success("Item removed successfully");
      dispatch({
        type: DELETE_ITEM_SUCCESS_ACTION,
        payload: response.data.data.id,
      });
    } catch (err) {
      dispatch({ type: DELETE_ITEM_FAILURE_ACTION });
      error(err?.response?.data?.message);
    }
  };
}

export function updateItem(item, id) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ITEM_REQUEST_ACTION });
    try {
      const response = await updateItemRequest(item, id);
      success("Item updated successfully");
      dispatch({
        type: UPDATE_ITEM_SUCCESS_ACTION,
        payload: response.data.data,
      });
    } catch (err) {
      dispatch({ type: UPDATE_ITEM_FAILURE_ACTION });
      error(err?.response?.data?.message);
    }
  };
}

export function toggleModal(data) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_MODAL_ACTION, payload: data });
  };
}
