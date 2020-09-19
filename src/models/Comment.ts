import {Document, model, Schema, Types} from 'mongoose';

export interface IComment<OId = Types.ObjectId> {
    content: string;
    userData: { email: string, name: string } | { user: OId };
    date: Date;
    responseTo: OId | null;
    forPost: OId;

}

export interface ICommentDoc extends Document, IComment {
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
        required: false,
        default: null,
        sparse: true,
        index: true
    }
    , forPost: {
        type: Types.ObjectId
        , required: true
        , index: true
    }, visible: {
        type: Boolean,
        required: true,
        default: false
    }
});

export default model<ICommentDoc>('comments', ModelSchema);