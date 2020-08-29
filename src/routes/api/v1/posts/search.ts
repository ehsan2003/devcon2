import {AggregationChain, BaseController, isValidRegexP, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {query, ValidationChain} from "express-validator";
import Post, {IPostDocSharable} from "@models/Post";
import configurations from "@conf/configurations";

type localRequestHandler = RequestHandler<{}, { msg: string, result: (IPostDocSharable & { isLiked?: boolean })[] }, {}, {
    q?: string;
    s?: 'd' | 'l';
    o?: 'a' | 'd';
    k?: string;
    l?: string;

}>;

class Search extends BaseController<localRequestHandler> {

    readonly access = Roles.anonymous;
    readonly method = 'get';
    readonly path = '/';
    protected middleware: localRequestHandler[]
        = [
        async (req, res, next) => {
            const queryString = req.query.q;
            const sortBy = req.query.s;
            const sortOrder = req.query.o;
            const searchLimit = parseInt(req.query.l || configurations.posts.search.limit.toString(), 10);
            const searchSkip = parseInt(req.query.k || '0', 10);
            const postQuery = {
                visible: true,
                ...queryString ? {$or: [{title: {$regex: queryString}}, {content: {$regex: queryString}}]} : []
            };
            const aggregationChain = new AggregationChain()
                .match(postQuery)
                .addFields({isLiked: {$in: [req.user && req.user._id, '$likes']}}, !!req.user)
                .addFields({likes: {$size: '$likes'}})
                .sort({
                    [sortBy === 'd' ? 'lastModified' : 'likes']: sortOrder === 'a' ? 1 : -1
                })
                .skip(searchSkip)
                .limit(searchLimit);
            res.json({msg: 'success', result: await aggregationChain.run(Post)});
        }
    ];

    protected validator: ValidationChain[] = [query('q')
        .optional()
        .isString().withMessage('invalid string')
        .custom(isValidRegexP)
        , query('l')
            .optional()
            .isString().withMessage('invalid string')
            .isInt().withMessage('not convertible to integer')
            .custom(limit => {
                const num = parseInt(limit, 10);
                return !(num < 1 || num > 100);
            }).withMessage('invalid range')
        , query('s')
            .optional()
            .isIn(['l', 'd'])
        , query('o')
            .optional()
            .isIn(['a', 'd'])
        , query('k')
            .optional()
            .isString().withMessage('invalid string')
            .isInt().withMessage('not convertible to integer')
            .custom(limit => parseInt(limit, 10) > 0).withMessage('positive required')];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Search();