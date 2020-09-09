import {Router} from 'express';
import post from './post';
import avatar from './avatar';
import postUpdate from './post-update';

const router = Router();
router.use('/post', post.getRouter());
router.use('/avatar', avatar.getRouter());
router.use('/post-update', postUpdate.getRouter());

export default router;