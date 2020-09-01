import {Router} from 'express';
import errorHandler from "./errorHandler";
import errorLogger from "./errorLogger";
import {NotFoundError} from "@shared/errors";
import v1 from './api/v1';
import upload from './upload';

const router = Router();

router.use('/api/v1', v1);
router.use('/upload', upload);

router.all('*', (req, res, next) => next(new NotFoundError(`route not found ${req.method} ${req.path}`)));
router.use(errorLogger(process.env.NODE_ENV === 'development'));
router.use(errorHandler(process.env.NODE_ENV === 'development'));

export default router;