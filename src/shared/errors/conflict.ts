import SiteError from "./site-error";
import StatusCode from "status-code-enum";

export  class ConflictError extends SiteError {
    readonly status = StatusCode.ClientErrorConflict;
}
