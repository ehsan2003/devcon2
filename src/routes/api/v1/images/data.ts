import {BaseController} from "@shared/utils";
import {RequestHandler} from "express";
import {param, ValidationChain} from "express-validator";
import ImageData, {IImageDataDoc} from "@models/ImageData";
import {NotFoundError} from "@shared/errors";

type localRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IImageDataDoc }, {}, {}>;

class Data extends BaseController<localRequestHandler> {

    readonly access = null;
    readonly method = 'get';
    readonly path = '/:id';
    protected middleware: localRequestHandler[]
        = [
        async (req, res, next) => {
            const imageData = await ImageData.findById(req.params.id);
            if (!imageData)
                throw new NotFoundError('imageData not found');
            res.json({msg: 'success', result: imageData});
        }
    ];

    protected validator: ValidationChain[] = [
        param('id')
            .exists().withMessage('id required')
            .isMongoId().withMessage('invalid mongo id')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Data();