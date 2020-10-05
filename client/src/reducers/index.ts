import {combineReducers} from "redux";
import authorization from "@reducers/reducer-authorization";
import {ReducerState} from "react";

const rootReducer = combineReducers({
    authorization
});
export default rootReducer;
export type RootState = ReducerState<typeof rootReducer>;