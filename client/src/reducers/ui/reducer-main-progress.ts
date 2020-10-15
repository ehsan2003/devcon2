import {Reducer} from "redux";
import {AllActions} from "@actions/index";
import produce from 'immer';
import {PROGRESS_SET_VISIBILITY} from "@actions/ui/creator-progress-set-visibility";
import {PROGRESS_CHANGE} from "@actions/ui/creator-progress-change";

export interface StateMainProgress {
    error: null | any;
    data: {
        visible: boolean;
        value: number;
    };
}

const initialState: StateMainProgress = {
    error: null,
    data: {
        visible: false,
        value: 0
    }
};

const mainProgress: Reducer<StateMainProgress, AllActions> = (
    mutableState = initialState
    , action) => produce(mutableState, state => {
    switch (action.type) {
        case PROGRESS_CHANGE:
            state.data.value = action.payload;
            break;
        case PROGRESS_SET_VISIBILITY:
            state.data.visible = action.payload;
            break;
        default:
            return state;
    }
});

export default mainProgress;