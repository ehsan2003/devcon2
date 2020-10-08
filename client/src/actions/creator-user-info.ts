import type {Action} from 'redux';

export const USER_INFO = 'USER_INFO';

export interface ActionTypeUserInfo extends Action<typeof USER_INFO> {
}

export const userInfo = (): ActionTypeUserInfo => ({
    type: USER_INFO
});
