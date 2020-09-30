import {Reducer} from "redux";
import {AllActions} from "@actions/base-action";
import {USER_LOGIN_FULFILLED} from "@actions/creator-user-login-fulfilled";

export type StateAuthorization = string | undefined;

const authorization: Reducer<StateAuthorization, AllActions> =
    (state, action) => {
        switch (action.type) {
            case USER_LOGIN_FULFILLED:
                return action.payload.token;
            default:
                return state;
        }
    };

export default authorization;