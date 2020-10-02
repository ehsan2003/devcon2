import {Reducer} from "redux";
import {AllActions} from "@actions/index";
import {USER_LOGIN_FULFILLED} from "@actions/creator-user-login-fulfilled";

export type StateAuthorization = {
    error: null | Error, data: null | string
};

const authorization: Reducer<StateAuthorization, AllActions> =
    (state = {
        error: null
        , data: null
    }, action) => {
        switch (action.type) {
            case USER_LOGIN_FULFILLED:
                return {data: action.payload.token, error: null};
            case "ERROR_USER_LOGIN_$_INVALID_EMAIL":
                return {
                    data: null,
                    error: action.error
                };
            case "ERROR_USER_LOGIN_$_INVALID_PASSWORD":
                return {
                    data: null,
                    error: action.error
                };
            default:
                return state;
        }
    };

export default authorization;