import {SiteError} from "@shared/errors/site-error";
import StatusCode from "status-code-enum";

export class BadRequestError extends SiteError {
    readonly status = StatusCode.ClientErrorBadRequest;

    constructor(msg: string = 'some of the request failed are invalid or not exists yet') {
        super(msg);
    }
}