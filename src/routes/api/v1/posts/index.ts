import {Router} from 'express';
import insert from './insert';
import update from './update';

const router = Router();

router.use('/insert', insert.getRouter());
router.use('/update', update.getRouter());

export default router;