import {Document, model, Schema} from 'mongoose';
import {Roles} from "@shared/utils";

export interface IUser {
    email: string;
    password: string;
    role: Roles;
}

export interface IUserDoc extends Document, IUser {
}

const ModelSchema = new Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: Number,
        required: true,
        default: Roles.unverified
    },
});

export default model<IUserDoc>('users', ModelSchema);