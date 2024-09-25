import { NextFunction, Request, Response } from 'express';
import { followNewUser, getUserById, getUserDetailsAndPosts } from '../services/userService';
import jwt from "jsonwebtoken";
import { CustomError } from '../utils/customError';


//
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    console.log(userId);
    const userDetails = await getUserById(Object(userId));
    res.status(200).json(userDetails);
};

export const getUserDetails = async(req : Request, res : Response, next : NextFunction)=>{
    const userId = req.params.userId;
    const response = await getUserDetailsAndPosts(Object(userId));
    res.status(200).json(response);
}

export const followUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        const currentUserId = decoded.userId;
        const userIdToFollow = req.body.userIdToFollow;

        if (!userIdToFollow) {
            return res.status(400).json({ message: 'No userIdToFollow provided' });
        }

        const response = await followNewUser(Object(currentUserId), Object(userIdToFollow));
        res.status(200).json(response);
    } catch (error) {
        next(new CustomError("Error", 404, [{ param: "id", msg: `${error}` }]));
    }

}
