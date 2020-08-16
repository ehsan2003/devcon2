import {Router} from 'express';
import insert from './insert';
import Delete from './delete';

const router = Router();

router.use('/delete', Delete.getRouter());
router.use('/insert', insert.getRouter());

export default router;