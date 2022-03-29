import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';
import { Lecture } from '../models';
import { HttpError, IRoute } from '../types';

export default function checkPermission(route: IRoute) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Check Permission");

            const { permission } = route;
            if (!permission) return next();

            if (!req.token) throw new HttpError(401, 'Token not passed from client');

            const { userId, userType }: any = jwt.verify(req.token, config.jwtSecret);

            if (permission.userTypes !== undefined && !permission.userTypes.includes(userType)) {
                throw new HttpError(403, 'Not accessible to the user');
            }

            if (permission.inLecture !== undefined) {
                console.log(req.params.lectureId);

                const lecture = await Lecture.findById(req.params.lectureId);
                if (!lecture) throw new HttpError(404,'No lecture found');

                if (permission.inLecture) {
                    if (!lecture.students.includes(userId) && lecture.professor !== userId) {
                        throw new HttpError(502,'User not enrolled or not a professor of this course');
                    }
                }
                else {
                    if (lecture.students.includes(userId) || lecture.professor === userId) {
                        throw new HttpError(502, 'Student already enrolled or a professor of this course');
                    }
                }
            }

            // Passed all checks
            req.auth = { userId, userType };

            return next();
        } catch (err) {
            next(err);
        }
    }
}
