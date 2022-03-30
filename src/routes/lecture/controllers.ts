import { NextFunction, Request, Response } from 'express';

import { Lecture, User } from '../../models';
import { generatePostId, IPost } from '../../models/lecture.model';
import { HttpError, IAuth } from '../../types';

// get lecture
export function getLecture(req: Request, res: Response, next: NextFunction) {
    Lecture.findById(req.params.lectureId)
        .exec((err, lecture) => {
            if (err) return next(err);
            res.status(200).json({ lecture });
        });
}

// all lecture
export function allLecture(req: Request, res: Response, next: NextFunction) {
    Lecture.find({})
        .exec((err, lectures) => {
            if (err) return next(err);
            res.status(200).json({ lectures });
        });
}

// all post of lecture
export function allPost(req: Request, res: Response, next: NextFunction) {
    Lecture.findById(req.params.lectureId)
        .exec((err, lecture) => {
            if (err) return next(err);
            if (!lecture) return next(new Error("Lecture not found"));
            res.status(200).json({ posts: lecture.posts });
        });
}

// all student of lecture
export async function allStudent(req: Request, res: Response, next: NextFunction) {
    try {
        const lecture = await Lecture.findById(req.params.lectureId);
        if (!lecture) throw new HttpError(401, "Lecture not found");

        const students = await User.find({ _id: { $in: lecture.students } });
        res.status(200).json({ students });
    } catch (err) {
        next(err);
    }
}

// lectures of user
export async function lectureOfUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.auth as IAuth;

    try {
        const user = await User.findById(userId);
        if (!user) throw new HttpError(401, "User not found");

        const lectures = await Lecture.find({ _id: { $in: user.lectures } });
        res.status(200).json({ lectures });
    } catch (err) {
        next(err);
    }
}

// for dashboard
// all lectures of a user
// sorted by date
export async function postOfUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.auth as IAuth;

    try {
        const user = await User.findById(userId);
        if (!user) throw new HttpError(401, "User not found");

        const lectures = await Lecture.find({ _id: { $in: user.lectures } });
        const posts = ([] as IPost[]).concat(...lectures.map(lecture => lecture.posts));

        res.status(200).json({ posts });

    } catch (err) {
        next(err);
    }
}

export function createLecture(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.auth as IAuth;

    Lecture
        .create({
            ...req.body.lecture,
            professor: userId
        })
        .then(lecture => {
            if (!lecture) throw new HttpError(501, "Lecture not created");

            return User.findByIdAndUpdate(userId, { $push: { lectures: lecture._id } }).exec();
        })
        .then(user => {
            if (!user) throw new HttpError(501, "User not updated");

            res.status(201).json({ message: "Lecture created" });
        })
        .catch(err => next(err));
}

export async function enrollLecture(req: Request, res: Response, next: NextFunction) {
    const { lectureId } = req.params;
    const { userId } = req.auth as IAuth;

    console.log(lectureId);
    console.log(userId);

    try {
        await Lecture.findByIdAndUpdate(lectureId, { $push: { students: userId } }).exec();
        await User.findByIdAndUpdate(userId, { $push: { lectures: lectureId } }).exec();

        res.status(201).json({
            message: "Enrolled in lecture",
        });
    }
    catch (err) {
        next(err);
    }
}

export async function deleteStudent(req: Request, res: Response, next: NextFunction) {
    const { lectureId, studentId: userId } = req.params;

    console.log(lectureId);
    console.log(userId);

    try {
        await Lecture.findByIdAndUpdate(lectureId, { $pull: { students: userId } }).exec();
        await User.findByIdAndUpdate(userId, { $pull: { lectures: lectureId } }).exec();

        res.status(201).json({
            message: "Unenrolled from lecture",
        });
    }
    catch (err) {
        next(err);
    }
}

export async function createPost(req: Request, res: Response, next: NextFunction) {
    try {
        const { lectureId } = req.params;

        const lecture = await Lecture.findById(lectureId).exec();
        if (!lecture) throw new HttpError(404, "Lecture not found");

        const newPostId = generatePostId(req.body.post.title);
        const newPostIdCnt = lecture.posts.filter(post => post.postId.startsWith(newPostId)).length;

        const newPost = {
            ...req.body.post,
            postId: `${newPostId}-${newPostIdCnt}`,
            lectureCode: lecture.code,
            createdAt: new Date(Date.now())
        };

        Lecture
            .findByIdAndUpdate(lectureId, { $push: { posts: newPost } })
            .exec((err, lecture) => {
                if (err) throw err;
                res.status(201).json({
                    message: "Created Post"
                });
            });
    }
    catch (err) {
        next(err);
    }
}

export function getPost(req: Request, res: Response, next: NextFunction) {
    const { lectureId, postId } = req.params;

    Lecture
        .findById(lectureId)
        .exec((err, lecture) => {
            if (err) return next(err);
            if (!lecture) return next(new HttpError(404, "Post not found"));
            const post = lecture.posts.find(post => post.postId === postId);
            res.status(200).json({ post });
        });
}