import {Aggregate, Document, FilterQuery, Model, model, Schema, Types} from 'mongoose';
import {IUserDoc} from "@models/User";
import {AggregationChain} from "@shared/utils";

export interface IPostDoc extends Document {
    content: KeyValuePair;
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
    preparePostForClient: (query: FilterQuery<IPostDoc>) => Aggregate<IPostDocSharable[]>;
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
        type: Schema.Types.Mixed,
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

ModelSchema.static('preparePostForClient', function (this: Model<IPostDoc, IPostModel>, query: FilterQuery<IPostDoc>) {
    return new AggregationChain()
        .match(query)
        .addFields({likes: {$size: '$likes'}})
        .lookup({
            from: 'images',
            localField: 'content.blocks.data.file.url',
            foreignField: '_id',
            as: 'images'
        })
        .run(this);
});

export default model<IPostDoc, IPostModel>('posts', ModelSchema);