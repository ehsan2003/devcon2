import {SiteError} from "./site-error";
import StatusCode from "status-code-enum";
import type {ValidationError} from 'express-validator';
import {ErrorCodes} from "@shared/utils";

export class UnprocessableEntity extends SiteError {
    readonly status = StatusCode.ClientErrorUnprocessableEntity;

    constructor(msg: string, public errors: ValidationError[]) {
        super(ErrorCodes.VALIDATION_ERROR, msg);
    }

    public sanitizeResponse(response: { [p: string]: any }): { [p: string]: any } {
        return {...super.sanitizeResponse(response), validationErrors: this.errors};
    }
}