import {ErrorCodes, extractProps, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import {IImageDataDoc} from "@models/ImageData";
import multer from "multer";
import configurations from "@conf/configurations";
import {ImageUploader} from "./controller-base";
import {IUserDoc} from "@models/User";
import {BadRequestError} from "@shared/errors";

export type UploadImagePostRequestHandler = RequestHandler<{}, { msg: string, result: IImageDataDoc }, {
    description: string;
    alt: string;
    title: string;
    details: string;
    slugPrefix: string;
    access: Roles;
}, {}>;

class Post extends ImageUploader<UploadImagePostRequestHandler> {
    protected upload = multer({
        fileFilter(req, file: Express.Multer.File, callback: multer.FileFilterCallback): void {
            if (!configurations.posts.image.allowedMimeTypes.includes(file.mimetype))
                callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
            callback(null, true);
        },
        limits: configurations.posts.image.uploadLimit,
        storage: multer.memoryStorage()
    });
    readonly access = Roles.author;
    readonly method = 'post';
    readonly path = '/';
    middlewareBeforeValidate = [this.upload.single('image')];
    protected middleware: UploadImagePostRequestHandler[]
        = [
        (req, res, next) => {
            if (!req.file)
                throw new BadRequestError(ErrorCodes.UPLOAD_IMAGE_POST_$_NOT_FOUND, 'no file');
            next();
        },
        async (req, res) => {
            const user = req.user as IUserDoc;
            const result = await this.saveImage({
                type: 'post',
                buff: req.file.buffer
                , sizes: configurations.posts.image.sizes,
                access: req.body.access,
                info: {
                    ...extractProps(req.body, 'description', 'alt', 'title', 'details'),
                    uploader: user._id,
                },
                slugPrefix: `${req.body.slugPrefix}-${Date.now()}`,
                mimetype: req.file.mimetype
            });
            res.json({msg: 'success', result});
        }
    ];

    protected validator: ValidationChain[] = [
        body('description')
            .exists().withMessage('required')
            .isString().withMessage('invalid string')
            .isLength({max: 100}).withMessage('invalid length')
        , body('alt')
            .exists().withMessage('required')
            .isString().withMessage('invalid string')
            .isLength({max: 30}).withMessage('invalid length')
        , body('title')
            .exists().withMessage('required')
            .isString().withMessage('invalid string')
            .isLength({max: 30}).withMessage('invalid length')
        , body('details')
            .exists().withMessage('required')
            .isString().withMessage('invalid string')
            .isLength({max: 500})
        , body('slugPrefix')
            .exists().withMessage('required')
            .isSlug().withMessage('invalid slug')
            .isLength({max: 40})
        , body('access')
            .isInt()
            .toInt()
            .isIn([-1, 0, 1, 2, 3, 4, 5, 6]).withMessage('invalid value')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Post();