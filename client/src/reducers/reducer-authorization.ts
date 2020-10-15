import {Reducer} from "redux";
import {AllActions} from "@actions/index";
import {USER_LOGIN_FULFILLED} from "@actions/ajax/creator-user-login-fulfilled";
import {USER_LOGIN_REJECTED} from "@actions/ajax/creator-user-login-rejected";
import {USER_LOGOUT} from "@actions/ajax/creator-user-logout";

export type StateAuthorization = {
    error: null | Error, data: null | string
};
const defaultState: StateAuthorization = {
    error: null,
    data: localStorage.getItem('authorization')
};
const authorization: Reducer<StateAuthorization, AllActions> =
    (state = defaultState, action) => {
        switch (action.type) {
            case USER_LOGIN_FULFILLED:
                return {data: action.payload.token, error: null};
            case USER_LOGIN_REJECTED:
                return {data: null, error: action.error};
            case USER_LOGOUT:
                return {data:null,error:null};
            default:
                return state;
        }
    };

export default authorization;