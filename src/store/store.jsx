import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import pokeListReducer from "./pokeListReducer";
let reducers = combineReducers({
  pokeListReducer: pokeListReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;
