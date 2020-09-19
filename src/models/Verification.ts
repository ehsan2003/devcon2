import {Document, model, Schema} from 'mongoose';
import {getRandomToken} from "@shared/utils";

export const enum verificationTypes {
    changePassword = 'changePassword',
    emailVerification = 'emailVerification',
    resetPassword = 'resetPassword'
}

export interface IVerification {
    token: string;
    data: { for: verificationTypes, email: string };
    expires: Date;

}

export interface IVerificationDoc extends Document, IVerification {
}

const ModelSchema = new Schema({
    token: {
        type: String,
        required: true,
        default: getRandomToken,
        index: true,
        unique: true
    },
    data: {
        type: {
            for: {
                type: String,
                enum: [
                    'changePassword'
                    , 'emailVerification'
                    , 'resetPassword'
                ],
                required: true
            },
            email: {
                type: String
                , required: true
            }
        },
        required: true,
        unique: true
    },
    expires: {
        type: Date,
        expires: 3600,
        default: Date.now
    }
});

export default model<IVerificationDoc>('verifications', ModelSchema);