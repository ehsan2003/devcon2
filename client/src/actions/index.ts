import {ActionTypeUserLoginFulfilled, userLoginFulfilled} from "@actions/creator-user-login-fulfilled";
import {ActionTypeUserLogin, userLogin} from "@actions/creator-user-login";
import {ActionTypeUserLoginRejected} from "@actions/creator-user-login-rejected";

export type AllActionCreators =
    typeof userLogin |
    typeof userLoginFulfilled;
export type AllActions =
    ActionTypeUserLoginFulfilled
    | ActionTypeUserLogin
    | ActionTypeUserLoginRejected;