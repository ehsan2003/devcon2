import type {Action} from 'redux';

export const LOGIN_DIALOG_OPEN_SET = 'LOGIN_DIALOG_OPEN_SET';

export interface ActionTypeLoginDialogOpenSet extends Action<typeof LOGIN_DIALOG_OPEN_SET> {
    payload: boolean;
}

export const loginDialogOpenSet = (open: boolean): ActionTypeLoginDialogOpenSet => ({
    type: LOGIN_DIALOG_OPEN_SET
    , payload: open
});
