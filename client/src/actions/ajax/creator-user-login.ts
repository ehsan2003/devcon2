import type {Action} from 'redux';

export const USER_LOGIN = 'USER_LOGIN';

export interface ActionTypeUserLogin extends Action<typeof USER_LOGIN> {
    payload: {
        email: string;
        password: string;
        'g-recaptcha-response': string;
    };
}

export const userLogin = (email: string, password: string, captcha: string): ActionTypeUserLogin => ({
    type: USER_LOGIN
    , payload: {
        email,
        password
        , "g-recaptcha-response": captcha
    }
});
