import SiteError from "@shared/errors/site-error";
import StatusCode from "status-code-enum";

export class BadRequestError extends SiteError {
    constructor(msg: string = 'some of the request failed are invalid or not exists yet') {
        super(msg);
    }

    readonly status = StatusCode.ClientErrorBadRequest;
}