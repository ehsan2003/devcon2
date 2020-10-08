import type {Action} from 'redux';
import {StateCurrentUser} from "@reducers/reducer-current-user";

export const USER_INFO_FULFILLED = 'USER_INFO_FULFILLED';

export interface ActionTypeUserInfoFulfilled extends Action<typeof USER_INFO_FULFILLED> {
    payload: StateCurrentUser;
}

export const userInfoFulfilled = (data: StateCurrentUser): ActionTypeUserInfoFulfilled => ({
    type: USER_INFO_FULFILLED
    , payload: data
});
