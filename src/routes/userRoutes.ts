import { Router } from 'express';
import { followUser, getUser, getUserDetails } from '../controllers/userController';

const router = Router();

router.get('/user/:id' ,getUser);
router.get('/user/profile/:userId', getUserDetails)
router.post('/followNewUser', followUser);

export default router;