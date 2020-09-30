import {BaseAction} from "@actions/base-action";
import type {ActionCreator} from 'redux';

export const USER_LOGIN_FULFILLED = 'USER_LOGIN_FULFILLED';

export interface ActionTypeUserLoginFulfilled extends BaseAction<typeof USER_LOGIN_FULFILLED> {
    payload: { token: string };
}

export const userLoginFulfilled: ActionCreator<ActionTypeUserLoginFulfilled> = (token: string) => ({
    type: USER_LOGIN_FULFILLED
    , payload: {token}
});
