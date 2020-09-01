import {Document, model, Schema, Types} from 'mongoose';
import {ResizeOptions} from "sharp";
import fs from 'fs-extra';
import {extension} from "mime-types";

interface IInfo {
    prefixPath: string;
    description?: string;
    details?: string;
    uploader?: Types.ObjectId;
    alt?: string;
    title?: string;
}

export interface IImageDataDoc extends Document {
    info: IInfo;
    access: number;
    sizes: {
        [p: string]: ResizeOptions & { width: number, height: number, fileSize: number };
    };
    dateModified: Date;
    mimetype: string;
    removeAll: () => Promise<void>;
    changePath: (newPath: string) => Promise<IImageDataDoc>;
    getPath: (sizeName: string) => string;
}

const ModelSchema = new Schema({
    access: {
        required: true,
        type: Number
    }
    , info: {
        required: true,
        type: {
            description: String,
            details: String,
            uploader: Types.ObjectId,
            alt: String,
            title: String
        }
    },
    sizes: {
        type: Schema.Types.Mixed,
        required: true
    },
    dateModified: {
        type: Date,
        required: true,
        default: Date.now
    },
    mimetype: {
        String,
        required: true
    }
});
ModelSchema.method('getPath', function (this: IImageDataDoc, sizeName: string) {
    const sizeInfo = this.sizes[sizeName];
    return this.info.prefixPath = `${this.info.prefixPath}-${sizeInfo.width}x${sizeInfo.height}.${extension(this.mimetype)}`;
});
ModelSchema.method('removeAll', function (this: IImageDataDoc) {
    return Promise.all([
        this.remove(),
        Promise.all(Object.keys(this.sizes)
            .map(sizeName =>
                fs.unlink(this.getPath(sizeName))
            ))
    ]);
});
ModelSchema.method('changePath', function (this: IImageDataDoc, newPrefixPath: string) {
    return Promise.all(
        Object
            .entries(this.sizes)
            .map(([sizeName, size]) =>
                fs.rename(this.getPath(sizeName), `${newPrefixPath}-${size.width}x${size.height}.${extension(this.mimetype)}`))
    ).then(() => {
        this.info.prefixPath = newPrefixPath;
        return this.save();
    });
});
export default model<IImageDataDoc>('images', ModelSchema);