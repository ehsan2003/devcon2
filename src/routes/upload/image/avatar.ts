import {Roles} from "@shared/utils";
import {RequestHandler} from "express";
import ImageData, {IImageDataDoc} from "@models/ImageData";
import {ImageUploader} from './controller-base';
import multer from "multer";
import configurations from "@conf/configurations";
import {IUserDoc} from "@models/User";
import Profile, {IProfileDoc} from "@models/Profile";
import {BadRequestError, InternalServerError, NotFoundError} from "@shared/errors";
import path from "path";

type localRequestHandler = RequestHandler<{}, { msg: string, result: IImageDataDoc }, {}, {}>;

class Avatar extends ImageUploader<localRequestHandler> {
    readonly access = Roles.subscriber;
    readonly method = 'post';
    readonly path = '/';
    protected upload = multer({
        fileFilter(req, file: Express.Multer.File, callback: multer.FileFilterCallback): void {
            if (!configurations.profile.avatar.allowedMimeTypes.includes(file.mimetype))
                callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
            callback(null, true);
        },
        limits: configurations.profile.avatar.uploadLimit,
        storage: multer.memoryStorage()
    });
    protected middleware: localRequestHandler[]
        = [this.upload.single('avatar'),
        (req, res, next) => {
            if (!req.file)
                throw new BadRequestError('no file');
            next();
        },
        async (req, res, next) => {
            const user = req.user as IUserDoc;
            const profile = await Profile.findOne({user: user._id});
            if (!profile)
                throw new NotFoundError('profile not found');
            req.data = profile;
            next();

        },
        async (req, res, next) => {
            const user = req.user as IUserDoc;
            const profile = req.data as IProfileDoc;
            if (profile.avatar) {
                const imageDataDoc = await ImageData.findOne({_id: profile.avatar});
                if (!imageDataDoc)
                    throw new InternalServerError(new Error('the data in db is conflict with some thing'));
                await this.saveImageFiles({
                    imageDataDoc,
                    buffer: req.file.buffer,
                    sizes: configurations.profile.avatar.sizes
                });
                res.json({msg: 'success', result: imageDataDoc});
            } else {
                const result = await this.saveImage({
                    type: 'avatar',
                    buff: req.file.buffer,
                    access: Roles.anonymous,
                    mimetype: req.file.mimetype,
                    slugPrefix: path.join('avatars', profile.slug),
                    info: {uploader: user._id, alt: profile.firstName, title: profile.firstName},
                    sizes: configurations.profile.avatar.sizes
                });
                profile.avatar = result._id;
                res.json({msg: 'success', result});
            }
        }
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Avatar();