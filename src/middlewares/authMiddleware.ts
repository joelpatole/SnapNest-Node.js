import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface AuthRequest extends Request {
    user?: any;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }
    try {
        console.log(process.env.JWT_SECRET);
        const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send({ error: 'Invalid token.' });
    }
};

export default authMiddleware;
