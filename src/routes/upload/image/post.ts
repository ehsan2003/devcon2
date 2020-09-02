import {extractProps, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {ValidationChain} from "express-validator";
import {IImageDataDoc} from "@models/ImageData";
import multer from "multer";
import configurations from "@conf/configurations";
import {ImageUploader} from "./index";
import {IUserDoc} from "@models/User";

type localRequestHandler = RequestHandler<{}, { msg: string, result: IImageDataDoc }, {
    description: string;
    alt: string;
    title: string;
    details: string;
    slugPrefix: string;
    access: Roles;
}, {}>;

class Post extends ImageUploader<localRequestHandler> {
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
    protected middleware: localRequestHandler[]
        = [
        async (req, res, next) => {
            const user = req.user as IUserDoc;
            const result = await this.saveImage({
                buff: req.file.buffer
                , sizes: configurations.posts.image.sizes,
                access: req.body.access,
                info: {
                    ...extractProps(req.body, 'description', 'alt', 'title', 'details'),
                    uploader: user._id,
                    prefixPath: `${req.body.slugPrefix}-${Date.now()}`
                },
                mimetype: req.file.mimetype
            });
            res.json({msg: 'success', result});
        }
    ];

    protected validator: ValidationChain[] = [];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Post();