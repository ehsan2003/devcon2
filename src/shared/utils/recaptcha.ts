import requestPromise from "request-promise";
import {InternalServerError, RecaptchaError} from "@shared/errors";

interface IRecaptchaApiResponse {
    success: boolean;
    'error-codes': string[];
    'challenge-ts': string;
    hostname: string;
}

export const verifyRecaptcha = (secret: string, response: string, remoteip?: string) => new Promise((resolve, reject) => {
    requestPromise.post({
        uri: 'https://www.google.com/recaptcha/api/siteverify',
        form: {
            response,
            secret,
            remoteip
        }
    }).then(res => {
        try {
            const json = JSON.parse(res) as IRecaptchaApiResponse;
            if (json.success) {
                resolve();
            } else {
                reject(new RecaptchaError('failed to verify recaptcha',json["error-codes"]));
            }
        } catch (e) {
            reject(new InternalServerError(new Error('google recaptcha invalid json schema')));
        }
    }).catch(reject);
});