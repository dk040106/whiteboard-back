import { Schema, model, Types } from 'mongoose';

export interface IPost {
    postId: string;
    title: string;
    body: string;
    createdAt: Date;
}

export function generatePostId(title: string): string {
    const now = new Date();
    return [
        now.getFullYear(), 
        now.getMonth() + 1,
        now.getDate(),
        ...title.split(' ').slice(0, 3)
    ].join('-');
}

const postSchema = new Schema<IPost>({
    postId: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    createdAt: { type: Date, required: true },
});

export interface ILecture {
    lectureId: string;
    name: string;
    students: Types.ObjectId[],
    professor: Types.ObjectId,
    posts: IPost[],
}

const lectureSchema = new Schema<ILecture>({
    lectureId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    professor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    posts: [{ type: postSchema }],
});

export const Lecture = model<ILecture>('Lecture', lectureSchema);