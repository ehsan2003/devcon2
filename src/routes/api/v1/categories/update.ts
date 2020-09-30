import {BaseController, extractProps, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Category, {ICategoryDoc} from "@models/Category";
import {Types} from "mongoose";
import {NotFoundError} from "@shared/errors";
import {Codes} from "../../../../@types";

export type CategoriesUpdateRequestHandler = RequestHandler<{}, { msg: string, result: ICategoryDoc }, { id: string, parent?: Types.ObjectId, slug?: string, enName?: string }, {}>;

class Update extends BaseController<CategoriesUpdateRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'put';
    readonly path: string = '/';
    protected middleware: CategoriesUpdateRequestHandler[]
        = [
        (async (req, res) => {
            const {body: reqBody} = req;
            const result = await Category.findOneAndUpdate({_id: reqBody.id}, {$set: extractProps(reqBody, 'enName', 'parent', 'slug')}, {new: true});
            if (!result)
                throw new NotFoundError(Codes.CATEGORIES_UPDATE_CATEGORY_NOT_FOUND, 'category not found');
            res.json({result, msg: 'success'});

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