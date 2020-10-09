import {Reducer} from "redux";
import {AllActions} from "@actions/index";
import produce from 'immer';

export interface StateLoginDialog {
    error: null | Error;
    data: {
        open: boolean;
    };
}

const initialState: StateLoginDialog = {
    error: null,
    data: {
        open: true
    }
};

const loginDialog: Reducer<StateLoginDialog, AllActions> = (
    mutableState = initialState
    , action) => produce(mutableState, state => {
    switch (action.type) {
        case "LOGIN_DIALOG_OPEN_SET":
            state.data.open = action.payload;
            break;
        default:
            return state;
    }
});

export default loginDialog;