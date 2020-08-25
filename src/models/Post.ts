import {Document, model, Schema, Types} from 'mongoose';
import {IUserDoc} from "@models/User";

export interface IPostDoc extends Document {
    content: string;
    lastModified: Date;
    author: IUserDoc | Types.ObjectId;
    visible: boolean;
    tags: Types.ObjectId[];
    likes: Types.ObjectId[];
    featuredImage: Types.ObjectId;
    category: Types.ObjectId;
    slug: string;
    title: string;
}

const ModelSchema = new Schema({
    tags: {
        type: [Schema.Types.ObjectId],
        default: []
    }, likes: {
        type: [Schema.Types.ObjectId],
        default: []
    }
    , content: {
        type: String,
        required: true,
    }, lastModified: {
        type: Date,
        default: Date.now,
        required: true
    }, author: {
        type: Types.ObjectId,
        ref: 'users',
        required: true
    }, visible: {
        type: Boolean,
        default: false,
    }, category: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    }, slug: {
        type: String,
        required: true,
        unique: true
    }, featuredImage: {
        type: Types.ObjectId,
        required: false,
        default: null
    }
});

export default model<IPostDoc>('posts', ModelSchema);