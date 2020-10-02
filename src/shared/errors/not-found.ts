import {SiteError, SiteErrorErrorType} from "@shared/errors/site-error";
import StatusCode from "status-code-enum";

export class NotFoundError extends SiteError {
    readonly status = StatusCode.ClientErrorNotFound;
}

export interface NotFoundErrorType extends SiteErrorErrorType {
}