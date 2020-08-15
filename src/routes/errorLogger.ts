import {ErrorRequestHandler} from 'express';
import {BadRequestError, InternalServerError, SiteError} from "@shared/errors";
import logger from "@shared/logger";
import {MulterError} from "multer";


export default (isDev: boolean): ErrorRequestHandler => (err: Error, req, res, next) => {
    if (err instanceof SiteError && !(err instanceof InternalServerError)) {
        logger.silly(err.message, {err, req, res});
        return next(err);
    } else if (err instanceof MulterError) {
        logger.silly(err.message, {err, req, res});
        return next(new BadRequestError(err.message));
    }
    logger.error(err.message, {err, req, res})
    next(new InternalServerError(err));
};