import {Schema, model, Document} from 'mongoose';
import {Roles} from "@shared/utils";

export interface IUserDoc extends Document {
    name: string;
    email: string;
    password: string;
    role: Roles;
    verified: boolean;
}

const ModelSchema = new Schema({
    name: {
        type: String,
        required: true,
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