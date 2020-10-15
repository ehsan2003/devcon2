import type {ActionCreator,Action} from 'redux';

export const USER_REGISTER = 'USER_REGISTER';

export interface ActionTypeUserRegister extends Action<typeof USER_REGISTER> {
    payload: {
        email:string;
        password:string;
        captcha:string;
    };
}

export const userRegister = (email:string,password:string,captcha:string):ActionTypeUserRegister => ({
    type: USER_REGISTER
    , payload: {
        email,
        password,
        captcha
    }
});
