import StatusCode from "status-code-enum";
import {SiteError} from "@shared/errors/site-error";

export class InternalServerError extends SiteError {
    readonly status = StatusCode.ServerErrorInternal

    constructor(public readonly mainError: Error) {
        super(mainError.message);
        console.error(mainError);
        // TODO add some functions to contact admin/programmer for fix this internal server error
    }
}