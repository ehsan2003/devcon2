import {Reducer} from "redux";
import {AllActions} from "@actions/index.ts";
import {MAIN_MENU_OPEN_SET} from "@actions/creator-main-menu-open-set";

export type StateMainMenuOpen = {
    data: boolean | null;
    error: any | null;
};

const reducerMainMenuOpen: Reducer<StateMainMenuOpen, AllActions> =
    (state = {error: null, data: false}, action) => {
        switch (action.type) {
            case MAIN_MENU_OPEN_SET:
                return {error: null, data: action.payload};
            default:
                return state;
        }
    };

export default reducerMainMenuOpen;