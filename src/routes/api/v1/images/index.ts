import {Router} from 'express';
import changeSlug from './change-slug';
import changeAccess from './change-access';
import data from './data';
import remove from './remove';
import search from './search';

const router = Router();

router.use('/change-slug', changeSlug.getRouter());
router.use('/change-access', changeAccess.getRouter());
router.use('/data', data.getRouter());
router.use('/remove', remove.getRouter());
router.use('/search', search.getRouter());

export default router;