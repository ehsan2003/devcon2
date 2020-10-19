import {AjaxError} from "rxjs/ajax";

export const isValidSiteError = (err: AjaxError): boolean => err.status === 500 || !!err.response.errCode;