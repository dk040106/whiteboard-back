import { NextFunction, Request, Response } from 'express';
import { User } from '../../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { HttpError } from '../../types';

export function signup(req: Request, res: Response, next: NextFunction) {
    const hash = bcrypt.hashSync(req.body.user.password, 10);
    const newUser = new User({
        ...req.body.user,
        password: hash,
    });

    newUser.save((err, user) => {
        if (err) return next(err);
        res.status(201).json({ message: "User Created" });
    });
}

export function login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body.user;

    User.findOne({ username })
        .then(user => {
            if (!user) throw new HttpError(404, "Username Incorrect");
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
