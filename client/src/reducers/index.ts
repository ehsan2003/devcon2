import {combineReducers} from "redux";
import authorization from "@reducers/reducer-authorization";
import {ReducerState} from "react";
import Ui from "@reducers/ui";

const rootReducer = combineReducers({
    authorization
    , ui: Ui
});
export default rootReducer;
export type RootState = ReducerState<typeof rootReducer>;