import { combineReducers } from "redux";
import { loader, login, register, items, bid } from "./reducers";

export default combineReducers({
  loader,
  login,
  register,
  items,
  bid,
});
