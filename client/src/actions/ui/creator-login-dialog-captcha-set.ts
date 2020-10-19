import type {Action} from 'redux';

export const LOGIN_DIALOG_CAPTCHA_SET = 'LOGIN_DIALOG_CAPTCHA_SET';

export interface ActionTypeLoginDialogCaptchaSet extends Action<typeof LOGIN_DIALOG_CAPTCHA_SET> {
    payload: string | null;
}

export const loginDialogCaptchaSet = (value: string | null): ActionTypeLoginDialogCaptchaSet => ({
    type: LOGIN_DIALOG_CAPTCHA_SET
    , payload: value
});
