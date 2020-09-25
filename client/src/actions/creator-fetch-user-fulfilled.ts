import {BaseAction} from "./base-action";
import type {ActionCreator} from 'redux';
import {secureUserInfo} from "../../../src/shared/utils";

export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';

export interface ActionTypeFetchUserFulfilled extends BaseAction<typeof FETCH_USER_FULFILLED> {
    payload: ReturnType<typeof secureUserInfo>;
}

export const fetchUserFulfilled: ActionCreator<ActionTypeFetchUserFulfilled> = (user: ReturnType<typeof secureUserInfo>) => ({
    type: FETCH_USER_FULFILLED
    , payload: user
});
