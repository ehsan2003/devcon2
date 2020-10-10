import {SiteError, SiteErrorErrorType} from "@shared/errors/site-error";
import StatusCode from "status-code-enum";
import {ErrorCodes} from "@shared/utils";

export class RecaptchaError extends SiteError {
    readonly status = StatusCode.ClientErrorTooManyRequests;
    readonly captchaError: string[];

    constructor(msg: string, err: string[]) {
        super(ErrorCodes.ERROR_RECAPTCHA_ERROR, msg);
        this.captchaError = err;
    }

    sanitizeResponse(response: { [p: string]: any }): { [p: string]: any } {
        return {
            ...super.sanitizeResponse(response),
            translatedCode: this.captchaError
        };
    }
}

export interface RecaptchaErrorType extends SiteErrorErrorType {
    msg: 'captcha error';
    errCode: 'ERROR_RECAPTCHA_ERROR';
}