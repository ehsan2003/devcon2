import {Reducer} from "redux";
import {AllActions} from "@actions/index";
import produce from 'immer';

export interface StateDeviceWidth {
    error: null | any;
    data: {
        width: number;
        height: number;
    };
}

const initialState: StateDeviceWidth = {
    error: null,
    data: {
        width: window.innerWidth,
        height: window.innerHeight
    }
};

const deviceWidth: Reducer<StateDeviceWidth, AllActions> = (
    mutableState = initialState
    , action) => produce(mutableState, state => {
    switch (action.type) {
        case "DEVICE_WIDTH_CHANGED":
            state.data = action.payload;
            state.error = null;
            break;
        default:
            return state;
    }
});

export default deviceWidth;