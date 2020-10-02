import {SiteError, SiteErrorErrorType} from "@shared/errors/site-error";
import StatusCode from "status-code-enum";

export class BadRequestError extends SiteError {
    readonly status = StatusCode.ClientErrorBadRequest;

    constructor(code: string, msg: string = 'some of the request failed are invalid or not exists yet') {
        super(code, msg);
    }
}

export interface BadRequestErrorType extends SiteErrorErrorType {
}