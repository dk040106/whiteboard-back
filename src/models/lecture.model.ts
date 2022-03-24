import { Schema, model, Types } from 'mongoose';

interface Post {
    title: string;
    body: string;
}

const postSchema = new Schema<Post>({
    title: { type: String, required: true },
    body: { type: String, required: true },
});

interface Lecture {
    id: string;
    name: string;
    students: Types.ObjectId[],
    professor: Types.ObjectId,
    posts: Post[],
}

const courseSchema = new Schema<Lecture>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    professor: { type: Schema.Types.ObjectId, ref: 'User' },
    posts: [{ type: postSchema, required: true }],
});

const CourseModel = model('Lecture', courseSchema);

export { CourseModel };