import {Document, model, Schema, Types} from 'mongoose';
import {ResizeOptions} from "sharp";
import fs from 'fs-extra';
import {Roles, roleToPath} from "@shared/utils";
import * as path from "path";
import {extension} from "mime-types";

interface IInfo {
    slugPrefix: string;
    description?: string;
    details: string;
    uploader: Types.ObjectId;
    alt: string;
    title: string;
}

export interface IImageDataDoc extends Document {
    info: IInfo;
    access: Roles;
    sizes: {
        [p: string]: ResizeOptions & { width: number, height: number, fileSize: number };
    };
    dateModified: Date;
    mimetype: string;

    getPath(sizeName: string): string;

    removeAll(): Promise<void>;

    getPathData(sizeName: string): Parameters<typeof generatePath>[0];

    changeData(newData: Partial<Omit<Parameters<typeof generatePath>[0], 'size' | 'mimetype'>>): Promise<IImageDataDoc>;
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
            title: String,
            slugPrefix: String
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

function generatePath(options: {
    access: Roles,
    slugPrefix: string,
    size: { width: number, height: number },
    mimetype: string
}) {
    return path.join('upload', roleToPath[options.access], `${options.slugPrefix}-${options.size.width}x${options.size.height}.${extension(options.mimetype)}`);
}

ModelSchema.method('getPathData', function (this: IImageDataDoc, sizeName: string) {
    return {
        access: this.access,
        slugPrefix: this.info.slugPrefix,
        mimetype: this.mimetype,
        size: this.sizes[sizeName]
    };
});
ModelSchema.method('getPath', function (this: IImageDataDoc, sizeName: string) {
    return generatePath(this.getPathData(sizeName));
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
ModelSchema.method('changeData', function (this: IImageDataDoc, newData: Partial<Omit<Parameters<typeof generatePath>[0], 'size' | 'mimetype'>>) {
    return Promise.all(
        Object.keys(this.sizes)
            .map(sizeName => fs.rename(this.getPath(sizeName), generatePath({
                ...this.getPathData(sizeName), ...newData,
            })))
    ).then(() => {
        if (newData.slugPrefix) this.info.slugPrefix = newData.slugPrefix;
        if (newData.access) this.access = newData.access;
        return this.save();
    })
        ;
});
export default model<IImageDataDoc>('images', ModelSchema);