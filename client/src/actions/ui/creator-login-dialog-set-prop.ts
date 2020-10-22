import type {Action} from 'redux';
import {StateLoginDialog} from "@reducers/ui/reducer-login-dialog";

export const LOGIN_DIALOG_SET_PROP = 'LOGIN_DIALOG_SET_PROP';

export interface ActionTypeLoginDialogSetProp extends Action<typeof LOGIN_DIALOG_SET_PROP> {
    payload: Partial<StateLoginDialog['data']>;
}

export const loginDialogSetProp = (payload: Partial<StateLoginDialog['data']>): ActionTypeLoginDialogSetProp => ({
    type: LOGIN_DIALOG_SET_PROP
    , payload
});
