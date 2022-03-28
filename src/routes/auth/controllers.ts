import { Request, Response } from 'express';
import { User } from '../../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

export async function signup(req: Request, res: Response) {
    // const hash = await bcrypt.hash(req.body.user.password, 10);
    // const newUser = new User({
    //     password: hash,
    //     ...req.body.user
    // });

    // newUser.save((err, result) => {
    //     if (err) throw err;
    //     res.status(201).json({
    //         message: "User Created",
    //         result
    //     })
    // });

    bcrypt.hash(req.body.user.password, 10).then(hash => {
        const user = new User({
            password: hash,
        });

        user.save().then(result => {
            res.status(201).json({
                message: "User Created",
                result
            });
        }).catch(error => { // TODO: make a separate error handler to handle all errors
            res.status(500).json({
                message: "Invalid Auth data",
                error
            });
        });
    });
}

export async function login(req: Request, res: Response) {
    const { username, password } = req.body;

    User.findOne({ username }).then(user => {
        if (!user) throw new Error("Username Incorrect");
        if(!bcrypt.compareSync(password, user.password)) throw new Error("Password Incorrect");

        const token = jwt.sign(
            { userID: user._id, userType: user.userType },
            config.jwtSecret,
            { expiresIn: '1d' },
        );
    
        res.status(200).json({
            token,
            expiresIn: 24 * 60 * 60,
            user: {
                userID: user._id,
                userType: user.userType
            }
        });
    }).catch(error => {
        res.status(500).json({
            message: "Invalid Auth data",
            error
        });
    })
    // const { username, password } = req.body;

    // const user = await User.findOne({ username });
    // if (!user) throw new Error("Username Incorrect");

    // const validate = await bcrypt.compare(password, user.password);
    // if (!validate) throw new Error("Password Incorrect");

    // const token = jwt.sign(
    //     { userID: user._id, userType: user.userType },
    //     config.jwtSecret,
    //     { expiresIn: '1d' },
    // );

    // res.status(200).json({
    //     token,
    //     expiresIn: 24 * 60 * 60,
    //     user: {
    //         userID: user._id,
    //         userType: user.userType
    //     }
    // });
}
