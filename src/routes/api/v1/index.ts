import {Router} from 'express';
import users from './users';
import tags from './tags';
import categories from './categories';
import comments from './comments';
import posts from './posts';

const router = Router();
router.use('/comments', comments);
router.use('/users', users);
router.use('/tags', tags);
router.use('/categories', categories);
router.use('/posts', posts);

export default router;