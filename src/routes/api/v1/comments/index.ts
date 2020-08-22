import {Router} from 'express';

const router = Router();

import insertAuthorized from './insert-authorized';
import insertUnAuthorized from './insert-unauthorized'
router.use('/insert',insertAuthorized.getRouter(),insertUnAuthorized.getRouter());

export default router;