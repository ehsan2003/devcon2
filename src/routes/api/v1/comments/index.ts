import {Router} from 'express';
import insertAuthorized from './insert-authorized';
import insertUnAuthorized from './insert-unauthorized'
import remove from './remove';
import visible from './visible';
import update from './update';

const router = Router();

router.use('/insert', insertAuthorized.getRouter(), insertUnAuthorized.getRouter());
router.use('/remove', remove.getRouter());
router.use('/visible', visible.getRouter());
router.use('/update', update.getRouter());

export default router;