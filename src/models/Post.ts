import {Aggregate, Document, FilterQuery, Model, model, Schema, Types} from 'mongoose';
import {IUserDoc} from "@models/User";
import {AggregationChain} from "@shared/utils";

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

export interface IPostModel extends Model<IPostDoc> {
    mapLikesToNumber: (query: FilterQuery<IPostDoc>) => Aggregate<IPostDocSharable[]>;
}

export type IPostDocSharable = IPostDoc & { likes: number };
const ModelSchema = new Schema({
    tags: {
        type: [Schema.Types.ObjectId],
        default: [],
        index: true
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
        ref: 'categories',
        index: true
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

ModelSchema.static('mapLikesToNumber', function (this: Model<IPostDoc, IPostModel>, query: FilterQuery<IPostDoc>) {
    return new AggregationChain()
        .match(query)
        .addFields({likes: {$size: '$likes'}})
        .run(this);
});

export default model<IPostDoc, IPostModel>('posts', ModelSchema);