import {Router} from 'express';
import changeSlug from './change-slug';
import changeAccess from './change-access';
import data from './data';
import remove from './remove';
import search from './search';
import changeInfo from './change-info';

const router = Router();

router.use('/change-slug', changeSlug.getRouter());
router.use('/change-access', changeAccess.getRouter());
router.use('/data', data.getRouter());
router.use('/remove', remove.getRouter());
router.use('/search', search.getRouter());
router.use('/change-info', changeInfo.getRouter());

export default router;