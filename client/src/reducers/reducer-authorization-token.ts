import {Reducer} from "redux";
import {AllActionTypes} from "../actions/base-action";
import {LOGIN_RESPONDED} from "../actions/creator-login-responded";

export default ((state, action) => {
    switch (action.type) {
        case LOGIN_RESPONDED:
            return action.payload.token;
        default:
            return state;
    }
}) as Reducer<string, AllActionTypes>;