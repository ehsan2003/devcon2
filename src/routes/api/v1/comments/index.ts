import {Router} from 'express';
import insertAuthorized from './insert-authorized';
import insertUnAuthorized from './insert-unauthorized'
import remove from './remove';
import visible from './visible';
import update from './update';
import getPost from './get-post';

const router = Router();

router.use('/insert', insertAuthorized.getRouter(), insertUnAuthorized.getRouter());
router.use('/remove', remove.getRouter());
router.use('/visible', visible.getRouter());
router.use('/update', update.getRouter());
router.use('/get-post', getPost.getRouter());

export default router;