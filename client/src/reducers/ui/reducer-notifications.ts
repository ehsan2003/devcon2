import {Reducer} from "redux";
import {AllActions} from "@actions/index";
import produce from 'immer';
import {OptionsObject, SnackbarKey} from "notistack";
import {ADD_NOTIFICATION, DISMISS_NOTIFICATION, REMOVE_NOTIFICATION} from "@actions/ui";

export interface StateNotifications {
    error: null;
    data: {
        key: SnackbarKey;
        message: string;
        options?: OptionsObject;
        dismissed: boolean;
    }[];
}

const initialState: StateNotifications = {
    error: null,
    data: []
};

const notifications: Reducer<StateNotifications, AllActions> = (
    mutableState = initialState
    , action) => produce(mutableState, state => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            (state.data as StateNotifications['data']).push(action.payload);
            break;
        case REMOVE_NOTIFICATION:
            state.data = state.data.filter(({key}) => key !== action.payload.key);
            break;
        case DISMISS_NOTIFICATION:
            state.data = state.data.map((notification) =>
                (action.payload.dismissAll || action.payload.key === notification.key) ? {
                    ...notification,
                    dismissed: true
                } : notification);
            break;
        default:
            return state;
    }
});

export default notifications;