import StatusCode from "status-code-enum";
import {SiteError, SiteErrorErrorType} from "@shared/errors/site-error";
import {ErrorCodes} from "@shared/utils";

export class InternalServerError extends SiteError {
    readonly status = StatusCode.ServerErrorInternal;

    constructor(public readonly mainError: Error) {
        super(ErrorCodes.ERROR_UNKNOWN_SERVER_ERROR, 'internal server error');
        console.error(mainError);
        // TODO add some functions to contact admin/programmer for fix this internal server error
    }
}

export interface InternalServerErrorErrorType extends SiteErrorErrorType {
    code: 'ERROR_UNKNOWN_SERVER_ERROR';
    msg: 'internal server error';
}