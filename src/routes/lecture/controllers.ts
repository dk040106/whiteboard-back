import { NextFunction, Request, Response } from 'express';
import { Lecture } from '../../models/lecture.model';
import { HttpError } from '../../types';

export function allLecture(req: Request, res: Response, next: NextFunction) {
    Lecture.find({}, (err, lectures) => {
        if (err) return next(err);
        res.status(200).json({ lectures });
    });
}

export function userLecture(req: Request, res: Response) {
    res.status(200).json({ message: "Succeed!" });
}

export function createLecture(req: Request, res: Response, next: NextFunction) {
    if (!req.auth) throw new HttpError(400, "No auth information");

    const { userId } = req.auth;

    const newLecture = new Lecture({
        ...req.body.lecture,
        professor: userId
    });

    newLecture.save((err, lecture) => {
        if (err) return next(err);

        res.status(201).json({
            message: "Lecture Created",
            lecture
        });
    });
}

export function enrollLecture(req: Request, res: Response, next: NextFunction) {
    if (!req.auth) throw new HttpError(400, "No auth information");

    const { lectureId } = req.params;
    const { userId } = req.auth;

    console.log(lectureId);

    Lecture.findOneAndUpdate(
        { lectureId },
        { $push: { students: userId } },
        null,
        (err, lecture) => {
            if (err) return next(err);

            res.status(201).json({
                message: "Enrolled in lecture!",
                lecture
            });
        }
    );
}

