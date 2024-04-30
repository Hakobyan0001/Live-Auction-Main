import {
  GET_ITEMS_SUCCESS_ACTION,
  GET_ITEM_DETAILS_SUCCESS_ACTION,
  ADD_ITEM_SUCCESS_ACTION,
  UPDATE_ITEM_SUCCESS_ACTION,
  DELETE_ITEM_SUCCESS_ACTION,
  TOGGLE_MODAL_ACTION,
} from "../constants/items";

const initialState = {
  items: [],
  count: 0,
  visible: false,
  confirmLoading: false,
  selectedItem: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_SUCCESS_ACTION:
      return {
        ...state,
        items: [...action.payload.rows],
        count: action.payload.count,
      };
    case GET_ITEM_DETAILS_SUCCESS_ACTION:
      return {
        ...state,
        selectedItem: action.payload,
      };
    case ADD_ITEM_SUCCESS_ACTION:
      return {
        ...state,
        items: [...state.items, action.payload],
        visible: false,
        count: state.count + 1,
      };
    case DELETE_ITEM_SUCCESS_ACTION:
      return {
        ...state,
        items: state.items.filter((el) => el.id !== action.payload),
        count: state.count - 1,
      };
    case UPDATE_ITEM_SUCCESS_ACTION:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        visible: false,
      };

    case TOGGLE_MODAL_ACTION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
