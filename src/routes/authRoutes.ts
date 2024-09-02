import { Router } from 'express';
import { signup, login, regenerateAccessToken } from '../controllers/authController';
import { signupValidator } from '../validators/authValidator';

const router = Router();

router.post('/register', signupValidator ,signup);
router.post('/login', login);
router.post('/regenerate-access-token',regenerateAccessToken);

export default router;