import {ActionTypeUserLoginFulfilled} from "@actions/creator-user-login-fulfilled";

export interface BaseAction<TypeString extends string> {
    type: TypeString;
}

export type AllActions = ActionTypeUserLoginFulfilled;