import {Reducer} from "redux";
import {AllActions} from "@actions/index";
import produce from 'immer';
import {USER_LOGIN_FULFILLED} from "@actions/ajax/creator-user-login-fulfilled";
import {LOGIN_DIALOG_OPEN_SET} from "@actions/ui/creator-login-dialog-open-set";

export interface StateLoginDialog {
    error: null | Error;
    data: {
        open: boolean;
    };
}

const initialState: StateLoginDialog = {
    error: null,
    data: {
        open: false
    }
};

const loginDialog: Reducer<StateLoginDialog, AllActions> = (
    mutableState = initialState
    , action) => produce(mutableState, state => {
    switch (action.type) {
        case LOGIN_DIALOG_OPEN_SET:
            state.data.open = action.payload;
            break;
        case USER_LOGIN_FULFILLED:
            state.data.open=false;
            break;
        default:
            return state;
    }
});

export default loginDialog;