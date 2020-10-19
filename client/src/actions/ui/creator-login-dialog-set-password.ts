import type {Action} from 'redux';

export const LOGIN_DIALOG_SET_PASSWORD = 'LOGIN_DIALOG_SET_PASSWORD';

export interface ActionTypeLoginDialogSetPassword extends Action<typeof LOGIN_DIALOG_SET_PASSWORD> {
    payload: string;
}

export const loginDialogSetPassword = (value: string): ActionTypeLoginDialogSetPassword => ({
    type: LOGIN_DIALOG_SET_PASSWORD
    , payload: value
});
