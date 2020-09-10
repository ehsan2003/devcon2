import {RequestHandler} from "express";
import {BaseController, extractProps, Roles} from "@shared/utils";
import configurations from "@conf/configurations";
import ImageData, {IImageDataDoc} from "@models/ImageData";
import sharp from "sharp";
import fs from "fs-extra";

export abstract class ImageUploader<T extends RequestHandler<any, { msg: string }, any, any>> extends BaseController<T> {
    protected saveImage(options: {
        type: 'post' | 'avatar'
        buff: Buffer;
        sizes: typeof configurations.posts.image.sizes;
        info: IImageDataDoc['info'];
        slugPrefix: string;
        mimetype: string;
        access: Roles
    }) {

        console.log(options.info);
        const imageDataDoc = new ImageData(extractProps(options, 'info', 'access', 'mimetype', 'slugPrefix', 'type'));
        return this.saveImageFiles({
            imageDataDoc,
            sizes: options.sizes,
            buffer: options.buff,
            mimetype: options.mimetype
        }).then(_ => imageDataDoc.save());
    }

    protected async saveImageFiles({imageDataDoc, sizes, buffer, mimetype}: { imageDataDoc: IImageDataDoc, sizes: typeof configurations.posts.image.sizes, buffer: Buffer, mimetype: string }) {
        const sharper = sharp(buffer);
        await imageDataDoc.removeFiles();
        imageDataDoc.mimetype = mimetype;
        imageDataDoc.sizes = {};
        return Promise.all(
            sizes.names.map(name => {
                const size = sizes.info[name];
                return sharper
                    .clone()
                    .resize(size)
                    .toBuffer({resolveWithObject: true})
                    .then(({info: meta, data: buff}) => {
                        imageDataDoc.sizes[name] = {
                            ...size
                            , ...extractProps(meta, 'width', 'height')
                            , fileSize: meta.size
                        };
                        return fs.writeFile(imageDataDoc.getPath(name), buff);
                    });
            }));
    }
}
