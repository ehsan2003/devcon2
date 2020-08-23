import {Router} from 'express';
import insert from './insert';
import update from './update';
import Delete from './delete';
import all from './all';

const router = Router();

router.use('/insert', insert.getRouter());
router.use('/update', update.getRouter());
router.use('/delete', Delete.getRouter());
router.use('/all', all.getRouter());

export default router;