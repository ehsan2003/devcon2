import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {param, ValidationChain} from "express-validator";
import ImageData, {IImageDataDoc} from "@models/ImageData";
import {NotFoundError} from "@shared/errors";

export type localRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IImageDataDoc }, {}, {}>;

class Remove extends BaseController<localRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'delete';
    readonly path = '/:id';
    protected middleware: localRequestHandler[]
        = [
        async (req, res, next) => {
            const imageData = await ImageData.findById(req.params.id);
            if (!imageData)
                throw new NotFoundError('image not found');
            await imageData.removeAll();
            res.json({msg: 'success', result: imageData});
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

export default new Remove();