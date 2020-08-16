import {BaseController, isValidRegexP} from "@shared/utils";
import {RequestHandler} from "express";
import {query, ValidationChain} from "express-validator";
import Tag, {ITagDoc} from "@models/Tag";
import {NotFoundError} from "@shared/errors";
import configurations from "@conf/configurations";

type localRequestHandler = RequestHandler<{}, { msg: string, result: ITagDoc[] }, {}, { q: string, l: number }>

class Search extends BaseController<localRequestHandler> {

    readonly access = null;
    readonly method = 'get';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            const pattern = req.query.q;
            const limit = req.query.l === void 0 ? configurations.tags.search.limitDefault : Math.abs(req.query.l);
            const result = await Tag.find({slug: {$regex: pattern}}).limit(limit);
            if (!result.length)
                throw new NotFoundError('tags not found');

            res.json({msg: 'success', result});
        })
    ];

    protected validator: ValidationChain[] = [
        query('q')
            .exists().withMessage('q required')
            .isString().withMessage('q is not a string')
            .custom(isValidRegexP)
        , query('l')
            .optional()
            .isInt()
            .toInt().withMessage('l is not convert able to int')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Search();