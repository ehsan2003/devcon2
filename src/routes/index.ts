import {Router} from 'express';
import errorHandler from "./errorHandler";
import errorLogger from "./errorLogger";
import {NotFoundError} from "@shared/errors";

const router = Router();

router.use('/api/v1', require('./api/v1').default);

router.all('*', (req, res, next) => next(new NotFoundError(`route not found ${req.method} ${req.path}`)));
router.use(errorLogger(process.env.NODE_ENV === 'development'))
router.use(errorHandler(process.env.NODE_ENV === 'development'))

export default router;