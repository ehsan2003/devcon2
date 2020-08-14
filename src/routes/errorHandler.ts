import {Request, Response, NextFunction} from 'express';
import {SiteError} from '@shared/errors';
import util from 'util';

export default (isDev: boolean) => (err: SiteError, req: Request, res: Response, next: NextFunction) => {
    const responseObject: { [p: string]: any } = {msg: err.message};
    // console.log(isDev);
    if (isDev)
        responseObject.err = util.inspect(err);
    console.log(err)
    return res.status(err.status).json(err.sanitizeResponse(responseObject));
};