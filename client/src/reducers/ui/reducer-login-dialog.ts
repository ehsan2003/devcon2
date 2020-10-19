import {Reducer} from "redux";
import {AllActions} from "@actions/index";
import produce from 'immer';
import {USER_LOGIN_FULFILLED} from "@actions/ajax/creator-user-login-fulfilled";
import {LOGIN_DIALOG_OPEN_SET} from "@actions/ui/creator-login-dialog-open-set";
import {LOGIN_DIALOG_CAPTCHA_SET, LOGIN_DIALOG_SET_EMAIL, LOGIN_DIALOG_SET_PASSWORD} from "@actions/ui";

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
        case LOGIN_DIALOG_CAPTCHA_SET:
            state.data.captchaValue = action.payload;
            break;
        case LOGIN_DIALOG_SET_EMAIL:
            state.data.email = action.payload;
            break;
        case LOGIN_DIALOG_SET_PASSWORD:
            state.data.password = action.payload;
            break;
        case LOGIN_DIALOG_OPEN_SET:
            state.data.open = action.payload;
            break;
        case USER_LOGIN_FULFILLED:
            state.data.open = false;
            break;
        default:
            return state;
    }
});

export default loginDialog;