import type {Action} from 'redux';

export const DEVICE_WIDTH_CHANGED = 'DEVICE_WIDTH_CHANGED';

export interface ActionTypeDeviceWidthChanged extends Action<typeof DEVICE_WIDTH_CHANGED> {
    payload: {
        width: number;
        height: number;
    };
}

export const deviceWidthChanged = (deviceWidth: number, deviceHeight: number): ActionTypeDeviceWidthChanged => ({
    type: DEVICE_WIDTH_CHANGED
    , payload: {
        width: deviceWidth,
        height: deviceHeight
    }
});
