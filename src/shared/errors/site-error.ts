import {Codes} from "../../@types";

export abstract class SiteError extends Error {
    abstract readonly status: number;
    public readonly code: Codes;

    public sanitizeResponse(response: { [key: string]: any }) {
        return response;
    }

    public constructor(code: Codes, message: string) {
        super(message);
        this.code = code;
    }
}