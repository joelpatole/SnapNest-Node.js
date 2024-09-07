import { Router } from 'express';
import { getUser, getUserDetails } from '../controllers/userController';

const router = Router();

router.get('/user/:id' ,getUser);
router.get('/user/profile/:userId', getUserDetails)

export default router;