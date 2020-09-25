import {Reducer} from "redux";
import {AllActionTypes} from "../actions/base-action";
import {secureUserInfo} from "../../../src/shared/utils";
import {FETCH_USER_FULFILLED} from "../actions/creator-fetch-user-fulfilled";

const reducer: Reducer<ReturnType<typeof secureUserInfo>, AllActionTypes> =
    (state, action) => {
        switch (action.type) {
            case FETCH_USER_FULFILLED:
                return action.payload;
            default:
                return state;
        }
    };

export default reducer;