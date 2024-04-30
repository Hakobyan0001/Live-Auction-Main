import {
  ADD_BID_SUCCESS_ACTION,
  UPDATE_BID_SUCCESS_ACTION,
} from "../constants/bid";

const initialState = {
  bid: 0,
  itemId: null,
  bidAllowed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_BID_SUCCESS_ACTION:
      return {
        ...state,
        bid: action.payload,
      };

    case UPDATE_BID_SUCCESS_ACTION:
      return {
        ...state,
        bid: state.items.map((bid) =>
          bid.id === action.payload.id ? action.payload : bid
        ),
        visible: false,
      };
    default:
      return state;
  }
};
