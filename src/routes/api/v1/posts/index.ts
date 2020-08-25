import {Router} from 'express';
import insert from './insert';
import update from './update';
import Delete from './delete';

const router = Router();

router.use('/insert', insert.getRouter());
router.use('/update', update.getRouter());
router.use('/delete', Delete.getRouter());
import visible from './visible';
router.use('/visible',visible.getRouter());
export default router;