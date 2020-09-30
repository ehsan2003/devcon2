import {AggregationChain, BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {query, ValidationChain} from "express-validator";
import Post, {IPostDocSharable} from "@models/Post";
import configurations from "@conf/configurations";

export type PostsSearchRequestHandler = RequestHandler<{}, { msg: string, result: (IPostDocSharable & { isLiked?: boolean })[] }, {}, {
    q?: string;
    s?: 'd' | 'l' | 'r';
    o?: 'a' | 'd';
    k?: string;
    l?: string;

}>;

class Search extends BaseController<PostsSearchRequestHandler> {

    readonly access = Roles.anonymous;
    readonly method = 'get';
    readonly path = '/';
    readonly sortOrders = {
        'l': 'likes',
        'r': 'score',
        'd': 'lastModified'
    };
    protected middleware: PostsSearchRequestHandler[]
        = [
        async (req, res) => {
            const queryString = req.query.q;
            const sortBy = req.query.s || 'r';
            const sortOrder = req.query.o || 'a';
            const searchLimit = parseInt(req.query.l || configurations.posts.search.limit.toString(), 10);
            const searchSkip = parseInt(req.query.k || '0', 10);
            const postQuery = {
                visible: true,
                ...queryString ? {$text: {$search: queryString}} : {}
            };
            const aggregationChain = new AggregationChain()
                .match(postQuery)
                .addFields({score: {$meta: 'textScore'}}, !!queryString)
                .addFields({isLiked: {$in: [req.user && req.user._id, '$likes']}}, !!req.user)
                .addFields({likes: {$size: '$likes'}})
                .sort({
                    [this.sortOrders[sortBy]]: sortOrder !== 'a' ? -1 : 1
                })
                .skip(searchSkip)
                .limit(searchLimit)
                .addFields({
                    featuredImage: {$ifNull: ['$featuredImage', {$arrayElemAt: ['$content.blocks.data.file.url', 0]}]}
                })
                .project({content: 0})
                .lookup({
                    foreignField: '_id',
                    as: 'image',
                    localField: 'featuredImage',
                    from: 'images'
                });
            const result = await aggregationChain.run(Post);
            console.log(result);
            res.json({msg: 'success', result});
        }
    ];

    protected validator: ValidationChain[] = [query('q')
        .optional()
        .isString().withMessage('invalid string')
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
            .isIn(['l', 'd', 'r'])
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