import {Router} from 'express';
import post from './post';
import avatar from './avatar';

const router = Router();
router.use('/post', post.getRouter());
router.use('/avatar', avatar.getRouter());

export default router;