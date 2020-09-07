import {Router} from 'express';
import changeSlug from './change-slug';
import changeAccess from './change-access';

const router = Router();

router.use('/change-slug', changeSlug.getRouter());
router.use('/change-access', changeAccess.getRouter());

export default router;