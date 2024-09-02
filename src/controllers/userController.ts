import { NextFunction, Request, Response } from 'express';
import { getUserById } from '../services/userService';


//
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    console.log(userId);
    const userDetails = await getUserById(Object(userId));
    res.status(200).json(userDetails);
};