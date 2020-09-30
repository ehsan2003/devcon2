import {BaseAction} from "@actions/base-action";
import type {ActionCreator} from 'redux';

export const USER_LOGIN = 'USER_LOGIN';

export interface ActionTypeUserLogin extends BaseAction<typeof USER_LOGIN> {
    payload: {
        email: string;
        password: string;
    };
}

export const userLogin: ActionCreator<ActionTypeUserLogin> = (email: string, password: string) => ({
    type: USER_LOGIN
    , payload: {
        email,
        password
    }
});
