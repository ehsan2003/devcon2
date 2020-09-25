import {Reducer} from "redux";
import {AllActionTypes} from "../actions/base-action";
import {secureUserInfo} from "../../../src/shared/utils";

export type StateUser = ReturnType<typeof secureUserInfo>;

const user: Reducer<StateUser, AllActionTypes> =
    (state, action) => {
        switch (action.type) {
            case "FETCH_USER_FULFILLED":
                return action.payload;
            default:
                return state;
        }
    };

export default user;