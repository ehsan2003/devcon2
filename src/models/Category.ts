import {Schema, Types, model, Document, Aggregate, Model, MongooseFilterQuery} from 'mongoose';

export interface IGetParentDoc extends ICategoryDoc {
    parents: Array<ICategoryDoc>
}

export interface ICategoryModel extends Model<ICategoryDoc> {
    getParent: (query: MongooseFilterQuery<ICategoryDoc>) => Aggregate<IGetParentDoc[]>
}

export interface ICategoryDoc extends Document {
    enName: string;
    handle: string;
    parent: Types.ObjectId;
}

const CategorySchema = new Schema({
    enName: {
        type: String,
        required: true
    },
    handle: {
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
    ])
})

export default model<ICategoryDoc, ICategoryModel>('categories', CategorySchema);