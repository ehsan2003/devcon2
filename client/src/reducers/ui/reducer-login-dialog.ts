import {Reducer} from "redux";
import {AllActions} from "@actions/index";
import produce from 'immer';
import {USER_LOGIN_FULFILLED} from "@actions/ajax/creator-user-login-fulfilled";
import {LOGIN_DIALOG_SET_PROP} from "@actions/ui";

export interface StateLoginDialog {
    error: null | Error;
    data: {
        open: boolean;
        captchaValue: string | null;
        password: string;
        email: string;
    };
}

const initialState: StateLoginDialog = {
    error: null,
    data: {
        password: '',
        email: '',
        captchaValue: null,
        open: false,
    }
};

const loginDialog: Reducer<StateLoginDialog, AllActions> = (
    mutableState = initialState
    , action) => produce(mutableState, state => {
    switch (action.type) {
        case LOGIN_DIALOG_SET_PROP:
            state.data = {...state.data, ...action.payload};
            break;
        case USER_LOGIN_FULFILLED:
            state.data.open = false;
            break;
        default:
            return state;
    }
});

export default loginDialog;