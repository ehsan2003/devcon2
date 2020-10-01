import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import ImageData, {IImageDataDoc} from "@models/ImageData";
import {NotFoundError} from "@shared/errors";
import {Codes} from "../../../../@types";

export type ImagesChangeInfoRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IImageDataDoc }, {
    details?: string;
    description?: string;
    alt?: string;
    title?: string;
}, {}>;

class ChangeInfo extends BaseController<ImagesChangeInfoRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'put';
    readonly path = '/:id';
    protected middleware: ImagesChangeInfoRequestHandler[]
        = [
        async (req, res) => {
            const imageData = await ImageData.findByIdAndUpdate(req.params.id, {
                $set: Object.fromEntries(Object.entries({
                    'info.details': req.body.details,
                    'info.description': req.body.description,
                    'info.alt': req.body.alt,
                    'info.title': req.body.title,
                }).filter(([index, value]) => value !== void 0))
            }, {new: true});
            if (!imageData)
                throw new NotFoundError(Codes.CHANGE_INFO_$_NOT_FOUND, 'image not found');
            res.json({msg: 'success', result: imageData});

        }
    ];

    protected validator: ValidationChain[] = [
        body('description')
            .optional()
            .isString().withMessage('invalid string')
            .isLength({max: 100}).withMessage('invalid length'),
        body('details')
            .optional()
            .isString().withMessage('invalid string')
            .isLength({max: 500}).withMessage('invalid length'),
        body('alt')
            .optional()
            .isString().withMessage('invalid string')
            .isLength({max: 30}).withMessage('invalid length'),
        body('title')
            .optional()
            .isString().withMessage('invalid string')
            .isLength({max: 30}).withMessage('invalid length'),

    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new ChangeInfo();