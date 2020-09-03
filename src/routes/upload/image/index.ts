import {Router} from 'express';
import post from './post';

const router = Router();
router.use('/post', post.getRouter());

export default router;