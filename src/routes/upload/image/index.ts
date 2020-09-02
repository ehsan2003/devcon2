import {RequestHandler, Router} from 'express';
import {BaseController, extractProps, Roles, roleToPath} from "@shared/utils";
import ImageData, {IImageDataDoc} from '@models/ImageData';
import configurations from "@conf/configurations";
import sharp from "sharp";
import {info} from "winston";
import fs from 'fs-extra';
import * as path from "path";
import post from './post';

const router = Router();
router.use('/post', post.getRouter());

export abstract class ImageUploader<T extends RequestHandler<any, { msg: string }, any, any>> extends BaseController<T> {
    protected saveImage(options: {
        buff: Buffer;
        sizes: typeof configurations.posts.image.sizes;
        info: IImageDataDoc['info'];
        mimetype: string;
        access: Roles
    }) {
        const sharper = sharp(options.buff);
        const imageDataDoc = new ImageData(extractProps(options, 'info', 'access', 'mimetype'));
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
                        return fs.writeFile(path.join('upload', roleToPath[options.access], imageDataDoc.getPath(name)), buff);
                    });
            })).then(_ => imageDataDoc.save());
    }
}

export default router;