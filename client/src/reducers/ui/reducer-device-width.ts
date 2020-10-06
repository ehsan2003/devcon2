import {Reducer} from "redux";
import {AllActions} from "@actions/index";
import produce from 'immer';
import theme from "../../theme";

type BreakPointValues = typeof theme.breakpoints.values;

export interface StateDeviceWidth {
    error: null | any;
    data: {
        width: number;
        height: number;
        is: { [key in keyof BreakPointValues]: boolean }
    };
}

function isBreakPoints(BreakPoints: BreakPointValues, currentWidth: number) {
    return Object.fromEntries(Object.entries(BreakPoints).map(([bpName, bpValue]) => [bpName, bpValue < currentWidth])) as { [p in keyof BreakPointValues]: boolean };
}

const initialState: StateDeviceWidth = {
    error: null,
    data: {
        width: window.innerWidth,
        height: window.innerHeight,
        is: isBreakPoints(theme.breakpoints.values, window.innerWidth)
    }
};

const deviceWidth: Reducer<StateDeviceWidth, AllActions> = (
    mutableState = initialState
    , action) => produce(mutableState, state => {
    switch (action.type) {
        case "DEVICE_WIDTH_CHANGED":
            state.data.width = action.payload.width;
            state.data.height = action.payload.height;
            state.data.is = isBreakPoints(theme.breakpoints.values, state.data.width);
            state.error = null;
            break;
        default:
            return state;
    }
});

export default deviceWidth;