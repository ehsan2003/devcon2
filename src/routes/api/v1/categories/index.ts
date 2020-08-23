import {Router} from 'express';
import insert from './insert';
import update from './update';
import Delete from './delete';
import all from './all';
import changeParent from './change-parent';

const router = Router();

router.use('/insert', insert.getRouter());
router.use('/update', update.getRouter());
router.use('/delete', Delete.getRouter());
router.use('/all', all.getRouter());
router.use('/change-parent', changeParent.getRouter());

export default router;