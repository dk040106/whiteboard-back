import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../../config';
import { User } from '../../models';
import { HttpError } from '../../types';

export function signup(req: Request, res: Response, next: NextFunction) {
    const hash = bcrypt.hashSync(req.body.user.password, 10);

    User.create({
            ...req.body.user,
            password: hash,
        })
        .then(user => {
            if (!user) throw new HttpError(500, "User not created");
            res.status(201).json({ message: "User Created" });
        })
        .catch(err => next(err));
}

export function login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body.user;

    User.findOne({ username })
        .then(user => {
            if (!user) throw new HttpError(404, "User ID Incorrect");
            if (!bcrypt.compareSync(password, user.password)) {
                throw new HttpError(401, "Password Incorrect");
            }

            const token = jwt.sign(
                { userId: user._id, userType: user.userType },
                config.jwtSecret,
                { expiresIn: '1d' },
            );

            res.status(200).json({
                token,
                expiresIn: 24 * 60 * 60,
                user: {
                    userId: user._id,
                    userType: user.userType
                }
            });
        })
        .catch(error => next(error));
    // const { username, password } = req.body;

    // const user = await User.findOne({ username });
    // if (!user) throw new Error("Username Incorrect");

    // const validate = await bcrypt.compare(password, user.password);
    // if (!validate) throw new Error("Password Incorrect");

    // const token = jwt.sign(
    //     { userId: user._id, userType: user.userType },
    //     config.jwtSecret,
    //     { expiresIn: '1d' },
    // );

    // res.status(200).json({
    //     token,
    //     expiresIn: 24 * 60 * 60,
    //     user: {
    //         userId: user._id,
    //         userType: user.userType
    //     }
    // });
}
