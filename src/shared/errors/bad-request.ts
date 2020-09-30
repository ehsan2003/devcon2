import {SiteError} from "@shared/errors/site-error";
import StatusCode from "status-code-enum";
import {Codes} from "../../@types";

export class BadRequestError extends SiteError {
    readonly status = StatusCode.ClientErrorBadRequest;

    constructor(code: Codes, msg: string = 'some of the request failed are invalid or not exists yet') {
        super(code, msg);
    }
}