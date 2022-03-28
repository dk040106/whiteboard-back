import { Schema, model, Types } from 'mongoose';

interface IPost {
    title: string;
    body: string;
}

const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    body: { type: String, required: true },
});

interface ILecture {
    id: string;
    name: string;
    students: Types.ObjectId[],
    professor: Types.ObjectId,
    posts: IPost[],
}

const lectureSchema = new Schema<ILecture>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    professor: { type: Schema.Types.ObjectId, ref: 'User' },
    posts: [{ type: postSchema, required: true }],
});

export const Lecture = model('Lecture', lectureSchema);