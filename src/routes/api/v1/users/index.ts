import {Router} from 'express';
import register from './register';
import Current from './current';
import Login from './login';
import verifyToken from './verify-token';
import verifySend from './verify-send';

const router = Router();

router.use('/register', register.getRouter());
router.use('/login', Login.getRouter());
router.use('/current', Current.getRouter());
router.use('/verify/send', verifySend.getRouter());
router.use('/verify/token', verifyToken.getRouter());

export default router;