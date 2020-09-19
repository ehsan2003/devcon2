import {Aggregate, Document, FilterQuery, Model, model, Schema, Types} from 'mongoose';
import {IUserDoc} from "@models/User";
import {AggregationChain} from "@shared/utils";

export interface IPost<OId = Types.ObjectId> {
    content: KeyValuePair;
    lastModified: Date;
    author: IUserDoc | OId;
    visible: boolean;
    tags: OId[];
    likes: OId[];
    featuredImage: OId;
    category: OId;
    slug: string;
    title: string;

}

export interface IPostDoc extends Document, IPost {
}

export interface IPostModel extends Model<IPostDoc> {
    preparePostForClient: (query: FilterQuery<IPostDoc>) => Aggregate<IPostDocSharable[]>;
}

export type IPostDocSharable = IPostDoc & { likes: number };
const ModelSchema = new Schema({
    title: {
        type: String,
        required: true
    },
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
            let: {images: '$content.blocks.data.file.url', featuredImage: '$featuredImage'},
            pipeline: [
                {$match: {$expr: {$or: [{$in: ['$_id', '$$images']}, {$eq: ['$_id', '$$featuredImage']}]}}},
            ],
            as: 'images'
        })
        .run(this);
});
ModelSchema.index({'$**': 'text'}, {
    default_language: 'none', weights: {
        title: 10,
        slug: 8,
        content: 1,
    }
});
export default model<IPostDoc, IPostModel>('posts', ModelSchema);