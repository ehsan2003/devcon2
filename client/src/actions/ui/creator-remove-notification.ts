import type {Action} from 'redux';
import {SnackbarKey} from "notistack";

export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export interface ActionTypeRemoveNotification extends Action<typeof REMOVE_NOTIFICATION> {
    payload: { key: SnackbarKey };
}

export const removeNotification = (key: SnackbarKey): ActionTypeRemoveNotification => ({
    type: REMOVE_NOTIFICATION
    , payload: {key}
});
