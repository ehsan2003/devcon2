import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, param, ValidationChain} from "express-validator";
import ImageData, {IImageDataDoc} from "@models/ImageData";
import {Types} from "mongoose";
import {NotFoundError} from "@shared/errors";

type localRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IImageDataDoc }, { newSlug: string }, {}>;

class ChangeSlug extends BaseController<localRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'put';
    readonly path = '/:id';
    protected middleware: localRequestHandler[]
        = [
        async (req, res, next) => {
            const id = Types.ObjectId(req.params.id);
            const imageDataDoc = await ImageData.findOne({_id: id});
            if (!imageDataDoc)
                throw new NotFoundError('image not found');
            const result = await imageDataDoc.changeSlug(req.body.newSlug);
            res.json({msg: 'success', result});
        }
    ];

    protected validator: ValidationChain[] = [
        body('newSlug')
            .exists().withMessage('required')
            .isSlug().withMessage('invalid slug')
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