import {ErrorCodes} from "@shared/utils";

export abstract class SiteError extends Error {
    abstract readonly status: number;
    public readonly code: string;

    public sanitizeResponse(response: { [key: string]: any }) {
        return response;
    }

    public constructor(code: string, message: string) {
        super(message);
        this.code = code;
    }
}

export interface SiteErrorErrorType {
    code: keyof typeof ErrorCodes;
    msg: string;
}