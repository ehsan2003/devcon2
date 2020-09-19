import {Document, model, Schema, Types} from 'mongoose';
import {ResizeOptions} from "sharp";
import fs from 'fs-extra';
import {Roles, roleToPath} from "@shared/utils";
import * as path from "path";
import {extension} from "mime-types";

interface IInfo {
    description?: string;
    details?: string;
    uploader: Types.ObjectId;
    alt: string;
    title: string;
}

export interface IImageData {
    slugPrefix: string;
    info: IInfo;
    access: Roles;
    sizes: {
        [p: string]: ResizeOptions & { width: number, height: number, fileSize: number };
    };
    dateModified: Date;
    mimetype: string;
    type: 'post' | 'avatar';

    getPath(sizeName: string): string;

    removeAll(): Promise<IImageDataDoc>;

    changeData(newData: Partial<Omit<Parameters<typeof generatePath>[0], 'size' | 'mimetype'>>): Promise<IImageDataDoc>;

    removeFiles(): Promise<void[]>;
}

export interface IImageDataDoc extends Document, IImageData {
}

const ModelSchema = new Schema({
    type: {
        type: String,
        required: false,
        enum: ['post', 'avatar'],
        default: 'post'
    },
    access: {
        required: true,
        type: Number
    },
    slugPrefix: {
        required: true
        , type: String
    }
    , info: {
        required: true,
        type: {
            description: String,
            details: String,
            uploader: Types.ObjectId,
            alt: String,
            title: String,

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
        type: String,
        required: true
    }
});

export function generatePath(options: {
    access: Roles,
    slugPrefix: string,
    size: { width: number, height: number },
    mimetype: string
}) {
    return path.join('upload', roleToPath[options.access], `${options.slugPrefix}-${options.size.width}x${options.size.height}.${extension(options.mimetype)}`);
}

ModelSchema.method('getPath', function (this: IImageDataDoc, sizeName: string) {
    return generatePath({...this.toObject(), size: this.sizes[sizeName]});
});
ModelSchema.method('changeData', function (this: IImageDataDoc, newData: Partial<Pick<Parameters<typeof generatePath>[0], 'access' | 'slugPrefix'>>) {
    return Promise.all(Object.keys(this.sizes).map(sizeName =>
        fs.rename(this.getPath(sizeName), generatePath({
            ...this.toObject(),
            ...newData,
            size: this.sizes[sizeName]
        }))
    )).then(() => {
        if (newData.access)
            this.access = newData.access;
        if (newData.slugPrefix)
            this.slugPrefix = newData.slugPrefix;
        return this.save();

    });
});
ModelSchema.method('removeAll', function (this: IImageDataDoc) {
    return this.removeFiles().then(() => this.remove());
});
ModelSchema.method('removeFiles', function (this: IImageDataDoc) {
    return Promise.all(Object.keys(this.sizes || {})
        .map(sizeName =>
            fs.unlink(this.getPath(sizeName))
        ));
});
ModelSchema.index({info: 'text', slugPrefix: 'text'}, {
    default_language: 'none', weights: {
        'info.slugPrefix': 10,
        'info.title': 10,
        'info.alt': 8,
        'info.description': 4,
        'info.details': 1
    }
});
export default model<IImageDataDoc>('images', ModelSchema);