import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    isModified(arg0: string): unknown;
    email: string;
    password: string;
    name: string;
    mobile: string;
    profilePicture?: string;
    followings: Schema.Types.ObjectId[];
    followers: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    profilePicture: { type: String, required: false },
    followings: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

// UserSchema.pre<IUser>('save', async function (next) {
//     if (!this.isModified('password')) {
//       return next();
//     }
  
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   });

export default model<IUser>('User', UserSchema);
