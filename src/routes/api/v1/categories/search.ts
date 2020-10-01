import {BaseController} from "@shared/utils";
import {RequestHandler} from "express";
import {query, ValidationChain} from "express-validator";
import configurations from "@conf/configurations";
import Category, {ICategoryDoc} from "@models/Category";
import {NotFoundError} from "@shared/errors";
import {Codes} from "../../../../@types";

export type localRequestHandler = RequestHandler<{}, { msg: string, result: ICategoryDoc[] }, {}, { q: string, l?: string }>;

class Search extends BaseController<localRequestHandler> {

    readonly access = null;
    readonly method = 'get';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res) => {
            const defaultLimit = configurations.categories.search.limit;
            const result = await Category.find({$or: [{slug: {$regex: req.query.q}}, {enName: {$regex: req.query.q}}]}).limit(parseInt(req.query.l || '0', 10) || defaultLimit);
            if (!result)
                throw new NotFoundError(Codes.CATEGORIES_SEARCH_$_NOT_FOUND, 'categories not found');
            res.json({msg: 'success', result});

        })
    ];

    protected validator: ValidationChain[] = [
        query('q')
            .exists().withMessage('required')
            .isString().withMessage('is not a string')
        , query('l')
            .optional()
            .isInt().withMessage('is not convertible to integer')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Search();