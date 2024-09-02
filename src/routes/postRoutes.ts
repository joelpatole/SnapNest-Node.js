import { Router } from 'express';
import PostController from '../controllers/postController';

const router = Router();

router.post('/bulk-posts', PostController.createBulkPosts);
router.get('/posts/:count', PostController.getPosts);

export default router;
