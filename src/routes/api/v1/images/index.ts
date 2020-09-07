import {Router} from 'express';
import changeSlug from './change-slug';
import changeAccess from './change-access';
import data from './data';
import remove from './remove';

const router = Router();

router.use('/change-slug', changeSlug.getRouter());
router.use('/change-access', changeAccess.getRouter());
router.use('/data', data.getRouter());
router.use('/remove', remove.getRouter());

export default router;