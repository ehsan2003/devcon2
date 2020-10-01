import {BaseController, ErrorCodes} from "@shared/utils";
import {RequestHandler} from "express";
import {param, ValidationChain} from "express-validator";
import ImageData, {IImageDataDoc} from "@models/ImageData";
import {NotFoundError} from "@shared/errors";

export type ImagesDataRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IImageDataDoc }, {}, {}>;

class Data extends BaseController<ImagesDataRequestHandler> {

    readonly access = null;
    readonly method = 'get';
    readonly path = '/:id';
    protected middleware: ImagesDataRequestHandler[]
        = [
        async (req, res) => {
            const imageData = await ImageData.findById(req.params.id);
            if (!imageData)
                throw new NotFoundError(ErrorCodes.IMAGES_DATA_$_NOT_FOUND, 'imageData not found');
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