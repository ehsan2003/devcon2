import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import ImageData, {IImageDataDoc} from "@models/ImageData";
import {Types} from "mongoose";
import {NotFoundError} from "@shared/errors";
import {Codes} from "../../../../@types";

export type ImagesChangeAccessRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IImageDataDoc }, { newAccess: Roles }, {}>;

class ChangeAccess extends BaseController<ImagesChangeAccessRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'put';
    readonly path = '/:id';
    protected middleware: ImagesChangeAccessRequestHandler[]
        = [
        async (req, res) => {
            const id = Types.ObjectId(req.params.id);
            const imageDataDoc = await ImageData.findById(id);
            if (!imageDataDoc)
                throw new NotFoundError(Codes.IMAGES_CHANGE_ACCESS_$_NOT_FOUND, 'image not found');
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