import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Category, {ICategoryDoc} from "@models/Category";

export type CategoriesInsertRequestHandler = RequestHandler<{}, { msg: string, result: ICategoryDoc }, { slug: string, enName: string, parent?: string }, {}>;

class Insert extends BaseController<CategoriesInsertRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'post';
    readonly path: string = '/';
    protected middleware: CategoriesInsertRequestHandler[]
        = [
        (async (req, res, next) => {
            const {body: reqBody} = req;
            const category = new Category({
                slug: reqBody.slug,
                enName: reqBody.enName,
                parent: reqBody.parent || null
            });
            await category.save().catch(this.handleUniqueError('duplicate slug'));
            res.json({msg: 'success', result: category});
        })
    ];

    protected validator: ValidationChain[] = [
        body('slug')
            .exists().withMessage('slug is required')
            .isSlug().withMessage('slug is invalid')
        , body('enName')
            .exists().withMessage('enName is required')
            .isString().withMessage('enName is not a string')
            .isLength({min: 3, max: 20}).withMessage('invalid length')
        , body('parent')
            .optional()
            .isMongoId().withMessage('parent is not a valid mongo id')
            .custom((parentId) => Category.exists({_id: parentId}).then(exists => exists ? Promise.resolve() : Promise.reject('parent not found')))
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Insert();