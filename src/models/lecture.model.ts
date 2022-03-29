import { Schema, model, Types } from 'mongoose';

interface IPost {
    title: string;
    body: string;
    createdAt: Date;
}

const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    body: { type: String, required: true },
    createdAt: { type: Date, required: true },
});

interface ILecture {
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