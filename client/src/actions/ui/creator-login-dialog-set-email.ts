import type {Action} from 'redux';

export const LOGIN_DIALOG_SET_EMAIL = 'LOGIN_DIALOG_SET_EMAIL';

export interface ActionTypeLoginDialogSetEmail extends Action<typeof LOGIN_DIALOG_SET_EMAIL> {
    payload: string;
}

export const loginDialogSetEmail = (value: string): ActionTypeLoginDialogSetEmail => ({
    type: LOGIN_DIALOG_SET_EMAIL
    , payload: value
});
