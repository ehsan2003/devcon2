import {Router} from 'express';
import users from './users';
import tags from './tags';
import categories from './categories';

const router = Router();

router.use('/users', users);
router.use('/tags', tags);
router.use('/categories', categories);

export default router;