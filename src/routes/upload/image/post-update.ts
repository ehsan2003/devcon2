import {Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {param, ValidationChain} from "express-validator";
import ImageData, {IImageDataDoc} from "@models/ImageData";
import {ImageUploader} from "./controller-base";
import multer from "multer";
import configurations from "@conf/configurations";
import {BadRequestError, NotFoundError} from "@shared/errors";

export type UploadImagePostUpdateRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IImageDataDoc }, {}, {}>;

class PostUpdate extends ImageUploader<UploadImagePostUpdateRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'put';
    readonly path = '/:id';
    protected upload = multer({
        fileFilter(req, file: Express.Multer.File, callback: multer.FileFilterCallback): void {
            if (!configurations.posts.image.allowedMimeTypes.includes(file.mimetype))
                callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
            callback(null, true);
        },
        limits: configurations.posts.image.uploadLimit,
        storage: multer.memoryStorage()
    });
    protected middleware: UploadImagePostUpdateRequestHandler[]
        = [this.upload.single('image'),
        (req, res, next) => {
            if (!req.file)
                throw new BadRequestError('no file');
            return next();
        },
        async (req, res) => {
            const imageDataDoc = await ImageData.findById(req.params.id);
            if (!imageDataDoc)
                throw new NotFoundError('imageData not found');
            await this.saveImageFiles({
                imageDataDoc,
                sizes: configurations.posts.image.sizes,
                buffer: req.file.buffer,
                mimetype: req.file.mimetype
            });
            res.json({msg: 'success', result: imageDataDoc});
        }
    ];

    protected validator: ValidationChain[] = [
        param('id')
            .isMongoId().withMessage('invalid mongo id')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new PostUpdate();