import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as authReducer } from "./auth/reducer";
import { reducer as blogReducer } from "./blog/reducer";
import { thunk } from "redux-thunk";

export const baseURL = process.env.REACT_APP_BASE_URL;

const rootReducer = combineReducers({
    authReducer,
    blogReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));