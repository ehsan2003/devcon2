import {BaseController, ErrorCodes, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, param, ValidationChain} from "express-validator";
import ImageData, {IImageDataDoc} from "@models/ImageData";
import {Types} from "mongoose";
import {NotFoundError} from "@shared/errors";

export type ImagesChangeSlugRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IImageDataDoc }, { newSlug: string }, {}>;

class ChangeSlug extends BaseController<ImagesChangeSlugRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'put';
    readonly path = '/:id';
    protected middleware: ImagesChangeSlugRequestHandler[]
        = [
        async (req, res) => {
            const id = Types.ObjectId(req.params.id);
            const imageDataDoc = await ImageData.findOne({_id: id});
            if (!imageDataDoc)
                throw new NotFoundError(ErrorCodes.IMAGES_CHANGE_SLUG_$_NOT_FOUND, 'image not found');
            const result = await imageDataDoc.changeData({slugPrefix: req.body.newSlug});
            res.json({msg: 'success', result});
        }
    ];

    protected validator: ValidationChain[] = [
        body('newSlug')
            .exists().withMessage('required')
            .isSlug().withMessage('invalid slug')
            .customSanitizer(slug => `${slug}-${Date.now()}`)
        , param('id')
            .exists().withMessage('required')
            .isMongoId().withMessage('invalid mongo id')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new ChangeSlug();