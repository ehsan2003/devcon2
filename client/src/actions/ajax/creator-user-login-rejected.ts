import type {Action} from 'redux';
import {AjaxError} from "rxjs/ajax";

export const USER_LOGIN_REJECTED = 'USER_LOGIN_REJECTED';

export interface ActionTypeUserLoginRejected extends Action<typeof USER_LOGIN_REJECTED> {
    error: AjaxError;
    status: number;
}

export const userLoginRejected = (err: AjaxError): ActionTypeUserLoginRejected => ({
    type: USER_LOGIN_REJECTED
    , error: err.response
    , status: err.status

});
