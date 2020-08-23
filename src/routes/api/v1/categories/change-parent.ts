import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import {Types} from "mongoose";
import Category from "@models/Category";

type localRequestHandler = RequestHandler<{}, { msg: string, result: any }, { source: Types.ObjectId, dest?: Types.ObjectId }, {}>;

class ChangeParent extends BaseController<localRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'put';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            const result = await Category.updateMany({parent: req.body.source}, {$set: {parent: req.body.dest || null}});
            res.json({msg: 'success', result});
        })
    ];

    protected validator: ValidationChain[] = [
        body('source')
            .exists().withMessage('required')
            .isMongoId().withMessage('invalid mongo id')
            .customSanitizer(Types.ObjectId)
            .custom(dest => Category.exists({_id: dest})).withMessage('not found')
        , body('dest')
            .optional()
            .isMongoId().withMessage('invalid mongo id')
            .customSanitizer(Types.ObjectId)
            .custom(dest => Category.exists({_id: dest})).withMessage('not found')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new ChangeParent();