import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { saveRefreshToken, signupUser, validateUser } from '../services/authService';
import { ValidationError, validationResult } from 'express-validator';
import { CustomError } from '../utils/customError';
import config from 'config';
import RefreshToken from '../models/RefreshToken';
import bcrypt from 'bcryptjs';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const validationErrors = errors.array().map((err: ValidationError) => ({
            param: err.type === 'field' ? err.path : 'unknown',
            msg: err.msg
        }));
        return next(new CustomError('Validation Error', 400, validationErrors));
    }

    try {
        console.log("req.body",req.body)
        const user = await signupUser(req.body);
        res.status(201).json({ user });
    } catch (error) {
        console.log(error);
        if (error instanceof CustomError) {
            return next(error);
        }
        next(new CustomError('Internal Server Error', 500));
    }
};


export const login = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const validationErrors = errors.array().map((err) => ({
            param: err.type === 'field' ? err.path : 'unknown',
            msg: err.msg
        }));
        return next(new CustomError('Validation Error', 400, validationErrors));
    }

    try {
        const { email, password } = req.body;
        const user = await validateUser({ email, password });

        const JWT_SECRET = String(process.env.JWT_SECRET)
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Generate refresh token
        const JWT_REFRESH_SECRET = String(process.env.JWT_REFRESH_SECRET)
        const refreshToken = jwt.sign(
            { userId: user._id },
            JWT_REFRESH_SECRET,
            { expiresIn: '7d' } // Refresh token expires in 7 days
        );

        //saving refresh token in database
        await saveRefreshToken(user._id, refreshToken);

        res.status(200).json({ message: 'Login successful', token: token, refreshToken : refreshToken });
    } catch (error) {
        if (error instanceof CustomError) {
            return next(error);
        }
        next(new CustomError('Internal Server Error', 500));
    }
};

export const regenerateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body;
        const JWT_REFRESH_SECRET = String(process.env.JWT_REFRESH_SECRET)
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { userId: string };

        const storedToken = await RefreshToken.findOne({ user: decoded.userId });
        if (!storedToken) {
            throw new CustomError('Invalid refresh token', 401);
        }


        const isValid = await bcrypt.compare(refreshToken, storedToken.token);
        if (!isValid) {
            throw new CustomError('Invalid refresh token', 401);
        }

        // Generate new tokens
        const JWT_SECRET = String(process.env.JWT_SECRET)
        const newToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, { expiresIn: '1h' });
        // const newRefreshToken = jwt.sign({ userId: decoded.userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

        // Update stored refresh token (token rotation)
        // const hashedNewRefreshToken = await bcrypt.hash(newRefreshToken, 10);
        // storedToken.token = hashedNewRefreshToken;
        storedToken.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await storedToken.save();

        // res.json({ token: newToken, refreshToken: newRefreshToken });
        res.json({ token: newToken });
    } catch (error) {
        next(error);
    }
};