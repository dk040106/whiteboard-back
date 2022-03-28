import { Schema, model, Types } from 'mongoose';

interface IUser {
    username: string;
    password: string;
    name: string;
    schoolId: string;
    userType: string;
    lectures: Types.ObjectId[],
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true, },
    password: { type: String, required: true },
    name: { type: String, required: true },
    schoolId: { type: String, required: true, unique: true, },
    userType: { type: String, enum: ['S', 'P'], required: true },
    lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }],
});

export const User = model<IUser>('User', userSchema);