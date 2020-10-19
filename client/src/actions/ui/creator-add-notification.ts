import type {Action} from 'redux';
import {StateNotifications} from "@reducers/ui/reducer-notifications";
import {OptionsObject} from "notistack";

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
type values<T extends any[]> = T extends (infer R)[] ? R : never;

export interface ActionTypeAddNotification extends Action<typeof ADD_NOTIFICATION> {
    payload: values<StateNotifications['data']>;
}

export const addNotification = (message: string, options?: OptionsObject): ActionTypeAddNotification => ({
    type: ADD_NOTIFICATION
    , payload: {
        message,
        key: options?.key || (new Date().getTime() + Math.random()),
        options,
        dismissed: false
    }
});
