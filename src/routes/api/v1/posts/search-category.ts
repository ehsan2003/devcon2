import {AggregationChain, BaseController, isValidRegexP, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {param, query, ValidationChain} from "express-validator";
import Category from "@models/Category";
import configurations from "@conf/configurations";
import {NotFoundError} from "@shared/errors";
import {IPostDocSharable} from "@models/Post";

export type PostsSearchCategoryRequestHandler = RequestHandler<{ category: string }, { msg: string, result: (IPostDocSharable & { isLiked?: boolean })[] }, {}, {
    q?: string;
    s?: 'd' | 'l' | 'r';
    o?: 'a' | 'd';
    k?: string;
    l?: string;
}>;

class SearchByCategory extends BaseController<PostsSearchCategoryRequestHandler> {

    readonly access = Roles.anonymous;
    readonly method = 'get';
    readonly path = '/:category';
    readonly sortOrders = {
        'l': 'likes',
        'r': 'score',
        'd': 'lastModified'
    };
    protected middleware: PostsSearchCategoryRequestHandler[]
        = [
        async (req, res) => {
            const queryString = req.query.q;
            const sortBy = req.query.s || 'r';
            const sortOrder = req.query.o || 'a';
            const category = req.params.category;
            const searchLimit = parseInt(req.query.l || configurations.posts.search.limit.toString(), 10);
            const searchSkip = parseInt(req.query.k || '0', 10);
            const postQuery = {
                visible: true,
                ...queryString ? {$text: {$search: queryString}} : {}
            };
            const chain = new AggregationChain()
                .match({slug: category})
                .graphLookup({
                    from: 'categories',
                    startWith: '$_id',
                    connectFromField: '_id',
                    connectToField: 'parent',
                    as: 'children'
                })
                .project({
                    children: {
                        $concatArrays: [
                            '$children', [
                                {
                                    _id: '$_id'
                                }
                            ]
                        ]
                    }
                })
                .project({'children._id': 1})
                .replaceUnwind('$children')
                .lookup({
                    as: 'posts'
                    , foreignField: "category"
                    , from: "posts"
                    , localField: "_id"
                })
                .replaceUnwind('$posts')
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

            const result = await Category.aggregate(chain.getPipelineInstance());
            if (!result.length)
                throw new NotFoundError('post not found');
            res.json({msg: 'success', result});
        }
    ];

    protected validator: ValidationChain[] = [
        param('category')
            .exists().withMessage('required')
            .isString().withMessage('invalid string')
        , query('q')
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
            .isIn(['l', 'd', 'r'])
        , query('o')
            .optional()
            .isIn(['a', 'd'])
        , query('k')
            .optional()
            .isString().withMessage('invalid string')
            .isInt().withMessage('not convertible to integer')
            .custom(limit => parseInt(limit, 10) > 0).withMessage('positive required')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new SearchByCategory();