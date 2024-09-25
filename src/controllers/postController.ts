import { NextFunction, Request, Response } from "express";
import PostService from "../services/postService";
import postService from "../services/postService";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class PostController {
  //
  public async createBulkPosts(req: Request, res: Response): Promise<void> {
    try {
      const posts = await PostService.bulkPost(req.body);
      res.status(201).json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  }

  //
  public async getPosts(req: Request, res: Response): Promise<any> {
    const count = parseInt(req.params.count as string) || 5;
    const page = parseInt(req.params.page as string) || 1;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    const userId = decoded.userId;

    const posts = await PostService.getPosts(count, page, userId);
    res.status(200).json(posts);
  }

  public async newPost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { imageUrl, description, genreId, userId } = req.body;
    try {
      // let userId: string | undefined = '';
      // const token = req.header("Authorization")?.replace("Bearer ", "");
      // if (token !== undefined) {
      //   const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
      //   console.log(decoded);
      // }
      const newPost = await postService.newPost({
        imageUrl,
        description,
        genreId,
        userId,
      });
      res.status(200).json(newPost);
    } catch (error) {
      res.status(409).json({ message: error });
    }
  }
}

export default new PostController();
