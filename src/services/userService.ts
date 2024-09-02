import mongoose from "mongoose";
import User from "../models/User";



export const getUserById = async (userId : mongoose.Schema.Types.ObjectId)=>{
  const userDetails = await User.findById(userId);
  return userDetails;
}