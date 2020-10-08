import {combineReducers} from "redux";
import authorization from "@reducers/reducer-authorization";
import user from '@reducers/./reducer-current-user';
import {ReducerState} from "react";
import Ui from "@reducers/ui";

const rootReducer = combineReducers({
    authorization
    , ui: Ui
    , user
});
export default rootReducer;
export type RootState = ReducerState<typeof rootReducer>;