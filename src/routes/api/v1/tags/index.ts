import {Router} from 'express';
import insert from './insert';
import Delete from './delete';
import search from './search';

const router = Router();

router.use('/delete', Delete.getRouter());
router.use('/insert', insert.getRouter());
router.use('/search', search.getRouter());

export default router;