import {Reducer} from "redux";
import {AllActionTypes} from "../actions/base-action";

export type StateAuthorizationToken = string | undefined;

const authorizationToken: Reducer<StateAuthorizationToken, AllActionTypes> =
    (state, action) => {
        switch (action.type) {
            case "LOGIN_RESPONDED":
                return action.payload.token;
            default:
                return state;
        }
    };

export default authorizationToken;