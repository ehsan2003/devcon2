import {Document, model, Schema} from 'mongoose';
import {Roles} from "@shared/utils";

export interface IUser {
    username: string;
    email: string;
    password: string;
    role: Roles;
}

export interface IUserDoc extends Document, IUser {
}

const ModelSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
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