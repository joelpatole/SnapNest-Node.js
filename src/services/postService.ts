import Post from "../models/Post";
import { IPost } from "../models/Post";
import mongoose from "mongoose";
import { CustomError } from "../utils/customError";
import User from "../models/User";
import { IUser } from "../models/User";

interface PopulatedPost extends Omit<IPost, "userId"> {
  userId: Pick<IUser, "_id" | "name" | "profilePicture" | "followers">;
}

class PostService {
  public async bulkPost(staticPosts: Partial<IPost[]>): Promise<IPost[] | any> {
    try {
      const posts = await Post.insertMany(staticPosts);
      return posts;
    } catch (error: any) {
      throw new Error(`Error inserting posts: ${error}`);
    }
  }

  // Method to fetch posts with pagination
  public async getPosts(
    count: number,
    page: number,
    currentUserId: string
  ): Promise<
    Array<PopulatedPost & { isOwnPost: number; isFollowing: number }>
  > {
    try {
      const posts = await Post.find()
        .populate<{
          userId: Pick<IUser, "_id" | "name" | "profilePicture" | "followers">;
        }>("userId", "name profilePicture followers")
        .populate("genreId", "displayName")
        .sort({ date: -1 })
        .skip((page - 1) * count)
        .limit(count)
        .lean<PopulatedPost[]>()
        .exec();

      const currentUser = await User.findById(currentUserId)
        .select("followings")
        .lean<Pick<IUser, "_id" | "followings">>();

      if (!currentUser) {
        throw new CustomError("Current user not found", 404, [
          { param: "userId", msg: "User not found" },
        ]);
      }

      const postsWithFlags = posts.map((post) => ({
        ...post,
        isOwnPost: post.userId._id.toString() === currentUserId ? 1 : 0,
        isFollowing:
          post.userId._id.toString() !== currentUserId &&
          currentUser.followings.some(
            (id) => id.toString() === post.userId._id.toString()
          )
            ? 1
            : 0,
      }));

      return postsWithFlags;
    } catch (error) {
      throw new CustomError("Error fetching posts", 400, [
        { param: "id", msg: `Error fetching posts: ${error}` },
      ]);
    }
  }


  public async newPost(post: any) {
    try {
      const newPost = await Post.create(post);
      return newPost;
    } catch (error) {
      throw new CustomError("Error", 409, [{ param: "id", msg: `${error}` }]);
    }
  }

  public async getUserPosts(userId: mongoose.Schema.Types.ObjectId) {
    try {
      const posts = await Post.find({ userId: userId }).sort({ date: -1 });
      return posts;
    } catch (error) {
      throw new CustomError("Error", 409, [{ param: "id", msg: `${error}` }]);
    }
  }
}

export default new PostService();
