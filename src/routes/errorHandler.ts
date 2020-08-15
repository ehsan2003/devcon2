import {NextFunction, Request, Response} from 'express';
import {InternalServerError, SiteError} from '@shared/errors';
import util from 'util';

export default (isDev: boolean) => (err: SiteError, req: Request, res: Response, next: NextFunction) => {
    const responseObject: { [p: string]: any } = {msg: err.message};
    if (isDev) {
        responseObject.err = util.inspect(err);
        if (err instanceof InternalServerError)
            responseObject.msg = err.mainError.message;
    }
    console.log(err)
    return res.status(err.status).json(err.sanitizeResponse(responseObject));
};