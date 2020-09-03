import {RequestHandler} from "express";
import {BaseController, extractProps, Roles, roleToPath} from "@shared/utils";
import configurations from "@conf/configurations";
import ImageData, {IImageDataDoc} from "@models/ImageData";
import sharp from "sharp";
import fs from "fs-extra";

export abstract class ImageUploader<T extends RequestHandler<any, { msg: string }, any, any>> extends BaseController<T> {
    protected saveImage(options: {
        buff: Buffer;
        sizes: typeof configurations.posts.image.sizes;
        info: IImageDataDoc['info'];
        mimetype: string;
        access: Roles
    }) {
        const sharper = sharp(options.buff);
        console.log(options.info);
        const imageDataDoc = new ImageData(extractProps(options, 'info', 'access', 'mimetype'));
        imageDataDoc.sizes = {};
        return Promise.all(
            options.sizes.names.map(name => {
                const size = options.sizes.info[name];
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
            })).then(_ => imageDataDoc.save());
    }
}
