import {Reducer} from "redux";
import {AllActions} from "@actions/index";
import produce from 'immer';
import {Roles} from "../../../src/shared/utils";
import {USER_INFO_FULFILLED} from "@actions/creator-user-info-fulfilled";

export interface StateCurrentUser {
    error: null | any;
    data: null | {
        _id: string;
        role: Roles;
    };
}

const initialState: StateCurrentUser = {
    error: null,
    data: null
};

const currentUser: Reducer<StateCurrentUser, AllActions> = (
    mutableState = initialState
    , action) => produce(mutableState, state => {
    switch (action.type) {
        case USER_INFO_FULFILLED:
            return action.payload;
        default:
            return state;
    }
});

export default currentUser;