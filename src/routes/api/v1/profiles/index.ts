import {Router} from 'express';
import create from './create';
import getSlug from './get-slug';
import getId from './get-id';

const router = Router();
router.use('/create', create.getRouter());
router.use('/get-slug', getSlug.getRouter());
router.use('/get-id', getId.getRouter());

export default router;