import { Request, Response } from 'express';

export const signin = (req: Request, res: Response) => {
    res.status(200).send('signin');
}

export const login = (req: Request, res: Response) => {
    res.status(200).send('login');
}
