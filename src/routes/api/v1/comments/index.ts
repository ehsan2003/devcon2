import {Router} from 'express';
import insertAuthorized from './insert-authorized';
import insertUnAuthorized from './insert-unauthorized'
import remove from './remove';

const router = Router();

router.use('/insert', insertAuthorized.getRouter(), insertUnAuthorized.getRouter());
router.use('/remove', remove.getRouter());

export default router;