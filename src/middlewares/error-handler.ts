import { NextFunction, Request, Response } from 'express';

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
    else {
        res.status(500).json({
            message: "Unknown server error: " + err.message
        });
    }
}