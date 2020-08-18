import {BaseController, extractProps, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Category from "@models/Category";
import {Query, Types} from "mongoose";
import {NotFoundError} from "@shared/errors";

type UnQuery<T> = T extends Query<infer R> ? R : never
type localRequestHandler = RequestHandler<{}, { msg: string, result: UnQuery<ReturnType<typeof Category.updateOne>> }, { id: string, parent?: Types.ObjectId, slug?: string, enName?: string }, {}>

class Update extends BaseController<localRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'put';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            const {body} = req;
            const result = await Category.updateOne({_id: body.id}, {$set: extractProps(body, 'enName', 'parent', 'slug')}, {new: true})
            if (!result)
                throw new NotFoundError('category not found');
            res.json({result: result, msg: 'success'});

        })
    ];

    protected validator: ValidationChain[] = [
        body('parent')
            .optional()
            .isMongoId().withMessage('invalid mongoId')
            .customSanitizer((parent) => new Types.ObjectId(parent)),
        body('id')
            .exists().withMessage('id is required')
            .isMongoId().withMessage('invalid mongoId')
        , body('enName')
            .optional()
            .isString().withMessage('enName is not a string')
            .isLength({min: 3, max: 20})
        , body('slug')
            .optional()
            .isSlug().withMessage('slug is invalid')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Update();