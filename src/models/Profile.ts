import {Document, model, Schema, Types} from 'mongoose';

export interface IProfileDoc extends Document {
    firstName: string;
    lastName?: string;
    social: KeyValuePair<string>;
    bio?: string;
    slug: string;
    user: Types.ObjectId;
    avatar?: Types.ObjectId;
}

const ModelSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    social: {
        type: Schema.Types.Mixed,
        required: true
    },
    bio: {
        type: String,
        required: false,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }, user: {
        type: Schema.Types.ObjectId,
        required: true,
    }, avatar: {
        type: Types.ObjectId,
        required: false,
        default: null
    }

});

export default model<IProfileDoc>('profiles', ModelSchema);