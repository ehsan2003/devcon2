import {Router} from 'express';
import register from './register';
import Current from './current';
import Login from './login';
import verifyToken from './verify-token';
import verifySend from './verify-send';
import resetPasswordSend from './reset-password-send';
import resetPasswordToken from './reset-password-token';

const router = Router();

router.use('/register', register.getRouter());
router.use('/login', Login.getRouter());
router.use('/current', Current.getRouter());
router.use('/verify/send', verifySend.getRouter());
router.use('/verify/token', verifyToken.getRouter());
router.use('/reset-password/send', resetPasswordSend.getRouter());
router.use('/reset-password/token', resetPasswordToken.getRouter());

export default router;