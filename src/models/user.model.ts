import { Schema, model, Types } from 'mongoose';

interface User {
    username: string;
    password: string;
    name: string;
    id: string;
    userType: string;
    lectures: Types.ObjectId[],
}

const userSchema = new Schema<User>({
    username: { type: String, required: true, unique: true, },
    password: { type: String, required: true },
    name: { type: String, required: true },
    id: { type: String, required: true, unique: true, },
    userType: { type: String, enum: ['S', 'P'], required: true },
    lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }],
});

const UserModel = model('User', userSchema);

export { UserModel };