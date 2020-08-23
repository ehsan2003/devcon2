import {Aggregate, Document, model, Model, MongooseFilterQuery, Schema, Types} from 'mongoose';

export interface IGetParentDoc extends ICategoryDoc {
    parents: ICategoryDoc[];
}

export interface ICategoryModel extends Model<ICategoryDoc> {
    getParent: (query: MongooseFilterQuery<ICategoryDoc>) => Aggregate<IGetParentDoc[]>;
}

export interface ICategoryDoc extends Document {
    enName: string;
    slug: string;
    parent: Types.ObjectId | null;
}

const CategorySchema = new Schema({
    enName: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    parent: {
        type: Schema.Types.ObjectId,
        default: null,
        required: false,
        index: true
    }
});

CategorySchema.static('getParent', function (this: Model<ICategoryDoc>, query: MongooseFilterQuery<ICategoryDoc>) {
    return this.aggregate([
        {
            $match: query
        }, {
            $graphLookup: {
                from: 'categories',
                startWith: '$parent',
                connectFromField: 'parent',
                connectToField: '_id',
                as: 'parent',
                depthField: 'depth'
            }
        }
    ]);
});

export default model<ICategoryDoc, ICategoryModel>('categories', CategorySchema);