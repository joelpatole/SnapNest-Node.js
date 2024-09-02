import Post from '../models/Post';
import { IPost } from '../models/Post';
import mongoose from 'mongoose';
import { CustomError } from '../utils/customError';

class PostService {
  public async bulkPost(staticPosts : Partial<IPost[]>): Promise<IPost[] | any> {
    try {
      const posts = await Post.insertMany(staticPosts);
      return posts;
    } catch (error : any) {
      throw new Error(`Error inserting posts: ${error}`);
    }
  }

  // Method to fetch posts with pagination
  public async getPosts(count: number, page: number): Promise<IPost[]> {
    try {
      const posts = await Post.find()
        .populate('userId', 'name profilePicture') // Include username and profileImage from User
        .populate('genreId', 'displayName') // Include displayName from Genre
        .skip((page - 1) * count)
        .limit(count)
        .exec();
         
      return posts;
    } catch (error) {
      throw new CustomError('Error', 400, [
        { param: 'id', msg: `${error}` }
    ]);
    }
  }
}

export default new PostService();
