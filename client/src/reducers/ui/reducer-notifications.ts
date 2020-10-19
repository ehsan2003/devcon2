import {Reducer} from "redux";
import {AllActions} from "@actions/index";
import produce from 'immer';
import {OptionsObject, SnackbarKey} from "notistack";

export interface StateNotifications {
    error: null ;
    data: {
        key:SnackbarKey;
        message:string;
        options:OptionsObject;
        dismissed:boolean;
    }[];
}

const initialState: StateNotifications = {
    error: null,
    data: []
};

const notifications: Reducer<StateNotifications, AllActions> = (
    mutableState = initialState
    , action) => produce(mutableState, state => {
    switch (action.type) {
        
        default:
            return state;
    }
});

export default notifications;