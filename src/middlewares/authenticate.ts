import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { throwError } from '../utils/AppError';
import { verifyJwt } from '../utils/jwt';
import { IUser } from '../types/types';
import { HydratedDocument } from 'mongoose';
import { findUserById } from '../services/user.service';

export const jwtAuth = () =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies['accessToken'];

        // token 404
        if (!token) {
            return throwError(401, 'Unauthorized');
        }
        const decodedToken = verifyJwt<HydratedDocument<IUser>>(
            token,
            'accessTokenPublicKey'
        );

        // invalid token
        if (!decodedToken) {
            return throwError(401, 'Unauthorized');
        }

        const user = await findUserById(decodedToken._id.toString());

        if (!user) {
            return throwError(401, 'Unauthorized');
        }

        next();
    });
