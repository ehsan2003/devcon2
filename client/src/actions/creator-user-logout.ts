import type {Action} from 'redux';

export const USER_LOGOUT = 'USER_LOGOUT';

export interface ActionTypeUserLogout extends Action<typeof USER_LOGOUT> {
}

export const userLogout = (): ActionTypeUserLogout => {
    localStorage.removeItem('authorization');
    return ({
        type: USER_LOGOUT
    });
};
