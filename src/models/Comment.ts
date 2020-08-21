import {Document, model, Schema, Types} from 'mongoose';

export interface ICommentDoc extends Document {
    content: string;
    userData: { email: string, name: string } | { user: Types.ObjectId };
    date: Date;
    responseTo: Types.ObjectId | null;
    forPost: Types.ObjectId;
}

const ModelSchema = new Schema({
    content: {
        type: String,
        required: true
    }
    , userData: {
        type: Schema.Types.Mixed,
        required: true
    }
    , date: {
        type: Date,
        required: true,
        default: Date.now
    }
    , responseTo: {
        type: Types.ObjectId,
        required: true,
        default: null,
        sparse:true,
        index:true
    }
    , forPost: {
        type: Types.ObjectId
        , required: true
    }
});

export default model<ICommentDoc>('comments', ModelSchema);