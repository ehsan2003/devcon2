import type {Action} from 'redux';

export const USER_INFO_REJECTED = 'USER_INFO_REJECTED';

export interface ActionTypeUserInfoRejected extends Action<typeof USER_INFO_REJECTED> {
    error: any
}

export const userInfoRejected = (err: any): ActionTypeUserInfoRejected => ({
    type: USER_INFO_REJECTED
    , error: err
});
