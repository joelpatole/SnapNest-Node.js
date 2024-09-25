import mongoose, { Document, model, ObjectId, Schema } from "mongoose";

export interface IComment {
  userId: ObjectId;
  username: string;
  text: string;
  date?: Date;
}

export interface IPost extends Document {
  _id: mongoose.Types.ObjectId;
  date?: Date;
  imageUrl: string;
  userId: ObjectId;
  description: string;
  genreId: ObjectId;
  likesCount: number;
  sharesCount: number;
  comments: IComment[];
  likes: Schema.Types.ObjectId[];
  shares: Schema.Types.ObjectId[];
}

//Comment schema
const commentSchema = new Schema<IComment>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Post schema
const postSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gener",
    required: true,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  sharesCount: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  shares: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// Create the Post model
export default model<IPost>("Post", postSchema);
