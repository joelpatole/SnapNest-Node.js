import User from '../models/User';
import bcrypt from 'bcryptjs';
import { CustomError } from '../utils/customError';
import mongoose from 'mongoose';
import RefreshToken from '../models/RefreshToken';

export const signupUser = async (userData: { email: string; password: string; name: string; mobile: string; image: string }) => {
    const { email, name, mobile } = userData;
    if (userData.image === undefined || userData.image === null || userData.image === ``) {
        userData.image = `https://media.istockphoto.com/id/1391584585/photo/3d-red-user-icon-profile-symbol-3d-rendering.jpg?s=1024x1024&w=is&k=20&c=Kwo8Dw6eboi_HaBRvqh-BdrUVDb40CH4c9ndqvMuylc=`
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new CustomError('User with this email already exists', 409, [
            { param: 'email', msg: 'Email is already in use' }
        ]);
    }

    const user = new User({ email, password: hashedPassword, name, mobile, profilePicture: userData.image });
    await User.create(user);

    return user;
};

export const validateUser = async (userData: { email: string; password: string }) => {
    const { email, password } = userData;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new CustomError('User not found', 412, [
            { param: 'email', msg: 'This email does not exist in our system' }
        ]);
    }


    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        throw new CustomError('Invalid Password', 401, [
            { param: 'password', msg: 'Incorrect password' }
        ]);
    }

    return existingUser;

}

export const getNewAccessToken = async () => {
    
}

export const saveRefreshToken = async (userId: mongoose.Types.ObjectId, refreshToken: string) => {
    
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    // Save the hashed refresh token
    await RefreshToken.create({
        user: userId,
        token: hashedRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    });

}

