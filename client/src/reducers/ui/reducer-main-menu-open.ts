import {Reducer} from "redux";
import {AllActions} from "@actions/index";
import produce from 'immer';
import {MAIN_MENU_OPEN_SET} from "@actions/ui/creator-main-menu-open-set";

export interface StateMainMenuOpen {
    error: null | any;
    data: boolean;
}

const initialState: StateMainMenuOpen = {
    error: null,
    data: false
};

const mainMenuOpen: Reducer<StateMainMenuOpen, AllActions> = (
    mutableState = initialState
    , action) => produce(mutableState, state => {
    switch (action.type) {
        case MAIN_MENU_OPEN_SET:
            state.data = action.payload;
            break;
        default:
            return state;
    }
});

export default mainMenuOpen;