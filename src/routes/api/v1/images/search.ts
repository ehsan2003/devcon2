import {AggregationChain, BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {query, ValidationChain} from "express-validator";
import ImageData, {IImageDataDoc} from "@models/ImageData";
import configurations from "@conf/configurations";

export type ImagesSearchRequestHandler = RequestHandler<{}, { msg: string, result: IImageDataDoc[] }, {},
    {
        search?: string, access?: Roles, mimetype?: string, sortOrder: 'a' | 'd', sortBy: 'd' | 's' | 'm' | 'r'
    }>;

class Search extends BaseController<ImagesSearchRequestHandler> {

    readonly access = Roles.contributor;
    readonly method = 'get';
    readonly path = '/';
    readonly sortMethods = {
        d: 'dateModified',
        s: 'sizes.full.fileSize',
        m: 'mimetype',
        r: 'score'
    };
    protected middleware: ImagesSearchRequestHandler[]
        = [
        async (req, res) => {
            const reqQuery = req.query;
            const matchQuery = {
                ...reqQuery.search ? {$text: {$search: reqQuery.search}} : {},
                ...reqQuery.mimetype ? {mimetype: reqQuery.mimetype} : {},
                ...reqQuery.access ? {access: reqQuery.access} : {},
            };
            const aggregationChain = new AggregationChain()
                .match(matchQuery)
                .addFields({score: {$meta: 'textScore'}}, !!reqQuery.search)
                .sort({
                    [this.sortMethods[reqQuery.sortBy]]: reqQuery.sortOrder !== 'a' ? -1 : 1
                });
            res.json({msg: 'success', result: await aggregationChain.run(ImageData)});
        }
    ];

    protected validator: ValidationChain[] = [
        query('search')
            .optional()
            .isString().withMessage('invalid string'),
        query('access')
            .optional()
            .isIn([-1, 0, 1, 2, 3, 4, 5, 6])
        , query('mimetype')
            .optional()
            .isIn(configurations.posts.image.allowedMimeTypes).withMessage('invalid mimetype')
        , query('sortOrder')
            .optional()
            .isIn(['a', 'd'])
        , query('sortBy')
            .optional()
            .isIn(['d', 's', 'm', 'r'])
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Search();