import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { Lecture } from '../models/lecture.model';
import config from '../config';
import { IRoute } from '../types';

export default function checkPermission(route: IRoute) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { permission } = route;
        if (!permission) return next();
        if(!req.token) throw new Error('Token not passed from client');

        const { userID, userType }: any = jwt.verify(req.token, config.jwtSecret);
        
        if(permission.userTypes && !permission.userTypes.includes(userType)) {
            throw new Error('Not accessible to the user');
        }

        if(permission.lectureID) {
            const lecture = await Lecture.findById(permission.lectureID);
            if(!lecture) throw new Error('No lecture found');
            // if student -> not included in lecture or
            // professor -> not professor of the lecture
            if(
                (userType === 'S' && !lecture.students.includes(userID)) || 
                (userType === 'P' && lecture.professor !== userID)
            ) {
                throw new Error('User not enrolled or not a professor of this course');
            }
        }

        req.auth = { userID, userType };
        return next();
    }
}
