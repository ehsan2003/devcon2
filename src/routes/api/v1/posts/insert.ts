import {BaseController, extractProps, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Post, {IPostDoc} from "@models/Post";
import {IUserDoc} from "@models/User";
import {isValidObjectId, Types} from "mongoose";
import Category from "@models/Category";
import Tag from "@models/Tag";

export type PostsInsertRequestHandler = RequestHandler<{}, { msg: string, result: IPostDoc }, Pick<IPostDoc, 'content' | 'title' | 'slug' | 'featuredImage' | 'category' | 'tags'>, {}>;

class Insert extends BaseController<PostsInsertRequestHandler> {

    readonly access = Roles.contributor;
    readonly method = 'post';
    readonly path: string = '/';
    protected middleware: PostsInsertRequestHandler[]
        = [
        (async (req, res, next) => {
            const result = new Post({
                    ...extractProps(req.body, 'content', 'title', 'slug', 'featuredImage', 'category', 'tags'),
                    author: (req.user as IUserDoc)._id
                }
            );
            await result.save().catch(this.handleUniqueError('duplicate slug'));
            res.json({msg: 'success', result});
        })
    ];

    protected validator: ValidationChain[] = [
        body('content')
            .exists().withMessage('required')
        , body('title')
            .exists().withMessage('required')
            .isString().withMessage('is not a string')
            .isLength({min: 3, max: 30})
        , body('slug')
            .exists().withMessage('required')
            .isSlug().withMessage('invalid slug')
        , body('featuredImage')
            .optional()
            .isMongoId().withMessage('invalid mongo id')
            .customSanitizer(Types.ObjectId)
        , body('category')
            .exists().withMessage('required')
            .isMongoId().withMessage('invalid mongo id')
            .customSanitizer(Types.ObjectId)
            .custom((category: Types.ObjectId) => Category.exists({_id: category})).withMessage('category not found')
        , body('tags')
            .optional()
            .isArray().withMessage('invalid array')
            .custom((arr: unknown[]) => arr.every(isValidObjectId)).withMessage('invalid object ids')
            .customSanitizer((tags: string[]) => tags.map(Types.ObjectId))
            .custom(async (tags) => {
                const tagsDocs = await Tag.find({_id: {$in: tags}});
                if (tagsDocs.length < tags)
                    throw new Error('at least one of tags doesn\'t exist');
                return true;
            })
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Insert();