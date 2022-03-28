import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { HttpError } from '../types';

export default async function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof HttpError) {
        const { status = 500, message } = err as HttpError;
        res.status(status).json({ message });
    }
    else if (err instanceof mongoose.MongooseError) {
        const { message } = err as mongoose.MongooseError;
        res.status(500).json({ message: "Database error: " + message });
    }
    else {
        res.status(500).json({ message: "Unknown error occured!" });
    }
}