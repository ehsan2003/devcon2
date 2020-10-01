import {BaseController, ErrorCodes, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {param, ValidationChain} from "express-validator";
import Category, {ICategoryDoc} from "@models/Category";
import {BadRequestError, NotFoundError} from "@shared/errors";
import {Types} from "mongoose";

export type localRequestHandler = RequestHandler<{ id: string }, { msg: string, result: ICategoryDoc }, {}, {}>;

class Delete extends BaseController<localRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'delete';
    readonly path: string = '/:id';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res) => {
            if (await Category.exists({parent: Types.ObjectId(req.params.id)}))
                throw new BadRequestError(ErrorCodes.ERROR_CATEGORIES_DELETE_$_DEPENDENCY_ERROR, 'this category is parent of other categories');

            const deletedCategory = await Category.findOneAndDelete({_id: Types.ObjectId(req.params.id)});
            if (!deletedCategory)
                throw new NotFoundError(ErrorCodes.ERROR_CATEGORIES_DELETE_$_CATEGORY_NOT_FOUND, 'category not found');
            res.json({msg: 'success', result: deletedCategory});

        })
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

export default new Delete();