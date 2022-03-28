import { Request, Response } from 'express';

export async function find(req: Request, res: Response) {
    res.status(200).send('signin');
}
