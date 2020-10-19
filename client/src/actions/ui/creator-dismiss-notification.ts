import type {Action} from 'redux';
import {SnackbarKey} from "notistack";

export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION';

export interface ActionTypeDismissNotification extends Action<typeof DISMISS_NOTIFICATION> {
    payload: { key?: SnackbarKey, dismissAll: boolean };
}

export const dismissNotification = (key?: SnackbarKey): ActionTypeDismissNotification => ({
    type: DISMISS_NOTIFICATION
    , payload: {
        key,
        dismissAll: !key
    }
});
