import mongoose from "mongoose";
import User from "../models/User";
import postService from "./postService";
import { CustomError } from "../utils/customError";



export const getUserById = async (userId : mongoose.Schema.Types.ObjectId)=>{
  const userDetails = await User.findById(userId);
  return userDetails;
}

export const getUserDetailsAndPosts = async(userId : mongoose.Schema.Types.ObjectId)=>{
  try{
    const userDetails = await User.findById(userId);
    const posts = await postService.getUserPosts(userId);
    return {
      userDetails, posts
    }
  }catch(error){
    throw new CustomError("Error", 409, [{ param: "id", msg: `${error}` }]);
  }
}

export const followNewUser = async (currentUserId: mongoose.Schema.Types.ObjectId, userIdToFollow: mongoose.Schema.Types.ObjectId)=>{
  try{
    const userToFollow = await User.findById(userIdToFollow);
    if(!userToFollow){
      throw new CustomError("User not found", 404, [{ param: "userIdToFollow", msg: "User not found" }]);
    }

    await User.findByIdAndUpdate(currentUserId, {$addToSet : {followings : userIdToFollow}});
    await User.findByIdAndUpdate(userIdToFollow, {$addToSet : {followers : currentUserId}});

  }catch(error){
    throw new CustomError("Error", 409, [{ param: "id", msg: `${error}` }]);
  }
}