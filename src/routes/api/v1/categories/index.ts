import {Router} from 'express';
import insert from './insert';
import update from './update';
import Delete from './delete';

const router = Router();

router.use('/insert', insert.getRouter());
router.use('/update', update.getRouter());
router.use('/delete', Delete.getRouter());

export default router;