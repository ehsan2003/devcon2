import {ActionTypeUserLoginFulfilled} from "@actions/creator-user-login-fulfilled";
import {ActionTypeUserLogin} from "@actions/creator-user-login";

export interface BaseAction<TypeString extends string> {
    type: TypeString;
}

export type AllActions =
    ActionTypeUserLoginFulfilled
    | ActionTypeUserLogin;