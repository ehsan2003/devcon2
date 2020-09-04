import {Document, model, Schema, Types} from 'mongoose';
import {ResizeOptions} from "sharp";
import fs from 'fs-extra';
import {Roles, roleToPath} from "@shared/utils";
import * as path from "path";
import {getFileNameBySlugAndSize} from "@shared/utils/get-file-name-by-slug-prefix-and-sizes";

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

    changeSlug(newPath: string): Promise<IImageDataDoc>;

    getPath(sizeName: string): string;

    getDir(): string;

    getFileName(sizeName: string): string;

    setAccess(newAccess: Roles): Promise<Roles>;

    removeAll(): Promise<void>;
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
        type: String,
        required: true
    }
});
ModelSchema.method('setAccess', function (this: IImageDataDoc, newAccess: Roles) {
    return Promise.all(Object.keys(this.sizes)
        .map((sizeName) => {
                return fs.rename(this.getPath(sizeName), path.join(roleToPath[newAccess], this.getFileName(sizeName)));
            }
        )).then(() => this.access = newAccess);
});
ModelSchema.method('getDir', function (this: IImageDataDoc) {
    return roleToPath[this.access];
});
ModelSchema.method('getFileName', function (this: IImageDataDoc, sizeName: string) {
    return getFileNameBySlugAndSize(this.info.slugPrefix, this.sizes[sizeName], this.mimetype);
});
ModelSchema.method('getPath', function (this: IImageDataDoc, sizeName: string) {
    return path.join(this.getDir(), this.getFileName(sizeName));
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
ModelSchema.method('changeSlug', function (this: IImageDataDoc, newSlugPrefix: string) {
    return Promise.all(
        Object
            .entries(this.sizes)
            .map(([sizeName, size]) =>
                fs.rename(this.getPath(sizeName), path.join(this.getDir(), getFileNameBySlugAndSize(newSlugPrefix, size, this.mimetype))))
    ).then(() => {
        this.info.slugPrefix = newSlugPrefix;
        return   this.save();
    });
});
export default model<IImageDataDoc>('images', ModelSchema);