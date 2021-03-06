import {BaseController, ErrorCodes, isValidRegexP} from "@shared/utils";
import {RequestHandler} from "express";
import {query, ValidationChain} from "express-validator";
import Tag, {ITagDoc} from "@models/Tag";
import {NotFoundError} from "@shared/errors";
import configurations from "@conf/configurations";

export type TagsSearchRequestHandler = RequestHandler<{}, { msg: string, result: ITagDoc[] }, {}, { q: string, l: number }>;

class Search extends BaseController<TagsSearchRequestHandler> {

    readonly access = null;
    readonly method = 'get';
    readonly path: string = '/';
    protected middleware: TagsSearchRequestHandler[]
        = [
        (async (req, res) => {
            const pattern = req.query.q;
            const limit = req.query.l === void 0 ? configurations.tags.search.limitDefault : Math.abs(req.query.l);
            const result = await Tag.find({slug: {$regex: pattern}}).limit(limit);
            if (!result.length)
                throw new NotFoundError(ErrorCodes.ERROR_TAGS_SEARCH_$_TAG_NOT_FOUND, 'tags not found');

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