import {Action} from "redux";

export const USER_LOGIN_FULFILLED = 'USER_LOGIN_FULFILLED';

export interface ActionTypeUserLoginFulfilled extends Action<typeof USER_LOGIN_FULFILLED> {
    payload: { token: string };
}

export const userLoginFulfilled = (token: string): ActionTypeUserLoginFulfilled => ({
    type: USER_LOGIN_FULFILLED
    , payload: {token}
});
