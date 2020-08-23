import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {param, ValidationChain} from "express-validator";
import Category, {ICategoryDoc} from "@models/Category";
import {NotFoundError} from "@shared/errors";

type localRequestHandler = RequestHandler<{ id: string }, { msg: string, result: ICategoryDoc }, {}, {}>;

class Delete extends BaseController<localRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'delete';
    readonly path: string = '/:id';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            const deletedCategory = await Category.findOneAndDelete({_id: req.params.id});
            if (!deletedCategory)
                throw new NotFoundError('category not found');
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