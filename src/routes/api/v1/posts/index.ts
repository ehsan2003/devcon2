import {Router} from 'express';
import insert from './insert';
import update from './update';
import Delete from './delete';
import visible from './visible';
import get from './get';
import like from './like';

const router = Router();

router.use('/insert', insert.getRouter());
router.use('/update', update.getRouter());
router.use('/delete', Delete.getRouter());
router.use('/visible', visible.getRouter());
router.use('/get', get.getRouter());
router.use('/like', like.getRouter());

export default router;