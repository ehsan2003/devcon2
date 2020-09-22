import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import ImageData, {IImageDataDoc} from "@models/ImageData";
import {Types} from "mongoose";
import {NotFoundError} from "@shared/errors";

export type localRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IImageDataDoc }, { newAccess: Roles }, {}>;

class ChangeAccess extends BaseController<localRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'put';
    readonly path = '/:id';
    protected middleware: localRequestHandler[]
        = [
        async (req, res, next) => {
            const id = Types.ObjectId(req.params.id);
            const imageDataDoc = await ImageData.findById(id);
            if (!imageDataDoc)
                throw new NotFoundError('image not found');
            await imageDataDoc.changeData({access: req.body.newAccess});
            res.json({msg: 'success', result: imageDataDoc});
        }
    ];

    protected validator: ValidationChain[] = [
        body('newAccess')
            .exists().withMessage('required')
            .isInt()
            .toInt().withMessage('invalid integer')
            .isIn([-1, 0, 1, 2, 3, 4, 5, 6]).withMessage('invalid role')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new ChangeAccess();