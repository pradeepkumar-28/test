import { combineReducers } from "redux";
import m3uReducer from "./m3uReducer";
import toastReducer from "./toastReducer";
import moviesReducer from "./moviesReducer";

export const rootReducer = combineReducers({
  m3uReducer,
  toastReducer,
  moviesReducer,
});
