import {BaseAction} from "./base-action";
import type {ActionCreator} from 'redux';

export const LOGIN_SEND = 'LOGIN_SEND';

export interface ActionTypeLoginSend extends BaseAction<typeof LOGIN_SEND> {
    payload: {
        email: string;
        password: string;
    };
}

export const loginSend: ActionCreator<ActionTypeLoginSend> = (email: string, password: string) => ({
    type: LOGIN_SEND
    , payload: {
        email, password
    }
});
