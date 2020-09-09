import {Router} from 'express';
import create from './create';
import getSlug from './get-slug';

const router = Router();
router.use('/create', create.getRouter());
router.use('/get-slug', getSlug.getRouter());

export default router;