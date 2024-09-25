import { Router } from "express";
import PostController from "../controllers/postController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/bulk-posts", PostController.createBulkPosts);
router.get("/posts/:page/:count", PostController.getPosts);
router.post("/new-post", PostController.newPost);

export default router;
