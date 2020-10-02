import {ActionTypeUserLoginFulfilled, userLoginFulfilled} from "@actions/creator-user-login-fulfilled";
import {ActionTypeUserLogin, userLogin} from "@actions/creator-user-login";
import {ErrorCodes} from "@shared/utils";

export type AllActionCreators =
    typeof userLogin |
    typeof userLoginFulfilled;
export type AllActions =
    ActionTypeUserLoginFulfilled
    | ActionTypeUserLogin
    | { type: keyof typeof ErrorCodes, error: any }
    ;