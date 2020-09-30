import {BaseAction} from "@actions/base-action";
import type {ActionCreator} from 'redux';

export const USER_LOGIN = 'USER_LOGIN';

export interface ActionTypeUserLogin extends BaseAction<typeof USER_LOGIN> {
}

export const userLogin: ActionCreator<ActionTypeUserLogin> = () => ({
    type: USER_LOGIN
});
