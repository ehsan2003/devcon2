import express, {Router} from 'express';
import errorHandler from "./errorHandler";
import errorLogger from "./errorLogger";
import {NotFoundError} from "@shared/errors";
import v1 from './api/v1';
import upload from './upload';
import fileProtection from './file-protection';
import {ErrorCodes} from "@shared/utils";

const router = Router();

router.use('/api/v1', v1);
router.use('/upload', upload);
router.use('/static', fileProtection.getRouter(), express.static('upload'));
router.all('*', (req, res, next) => next(new NotFoundError(ErrorCodes.ERROR_ROUTE_DOES_NOT_EXISTS, `route not found ${req.method} ${req.path}`)));
router.use(errorLogger(process.env.NODE_ENV === 'development'));
router.use(errorHandler(process.env.NODE_ENV === 'development'));

export default router;