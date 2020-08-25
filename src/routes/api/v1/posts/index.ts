import {Router} from 'express';

const router = Router();

import insert from './insert';
router.use('/insert',insert.getRouter());

export default router;