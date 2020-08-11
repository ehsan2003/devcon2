import {SiteError} from "@shared/errors/site-error";
import StatusCode from "status-code-enum";

export class AccessForbiddenError extends SiteError {
    readonly status = StatusCode.ClientErrorForbidden
}