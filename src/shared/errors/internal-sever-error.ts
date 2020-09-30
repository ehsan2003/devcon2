import StatusCode from "status-code-enum";
import {SiteError} from "@shared/errors/site-error";
import {Codes} from "../../@types";

export class InternalServerError extends SiteError {
    readonly status = StatusCode.ServerErrorInternal;

    constructor(public readonly mainError: Error) {
        super(Codes.UNKNOWN_SERVER_ERROR, 'internal server error');
        console.error(mainError);
        // TODO add some functions to contact admin/programmer for fix this internal server error
    }
}