import {BaseController, ErrorCodes, extractProps, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, param, ValidationChain} from "express-validator";
import Post, {IPostDoc} from "@models/Post";
import {IUserDoc} from "@models/User";
import {AccessForbiddenError, NotFoundError} from "@shared/errors";
import {isValidObjectId, Types} from "mongoose";
import Category from "@models/Category";
import Tag from "@models/Tag";

export type PostsUpdateRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IPostDoc }, Partial<Pick<IPostDoc, 'content' | 'title' | 'slug' | 'featuredImage' | 'category' | 'tags'>>, {}>;

class Update extends BaseController<PostsUpdateRequestHandler> {

    readonly access = Roles.contributor;
    readonly method = 'put';
    readonly path: string = '/:id';
    protected middleware: PostsUpdateRequestHandler[]
        = [
        async (req, res, next) => {
            const user = req.user as IUserDoc;
            const postId = req.params.id;
            const post = await Post.findById(postId);
            if (!post)
                throw new NotFoundError(ErrorCodes.ERROR_POST_UPDATE_$_POST_NOT_FOUND, 'post not found');
            if (user.role < Roles.editor && !post.author.equals(user._id))
                throw new AccessForbiddenError(ErrorCodes.ERROR_POST_UPDATE_$_ACCESS_FORBIDDEN, 'access denied');
            req.data = post;
            next();
        }
        ,
        async (req, res) => {
            const post = req.data as IPostDoc;
            Object.assign(post, {
                ...extractProps(req.body, 'content', 'title', 'slug', 'featuredImage', 'category'),
                lastModified: Date.now()
            });
            post.save().catch(this.handleUniqueError(ErrorCodes.ERROR_POST_UPDATE_$_DUPLICATE_SLUG, 'duplicate slug'));
            res.json({msg: 'success', result: post});
        }
    ];

    protected validator: ValidationChain[] = [
        param('id')
            .exists().withMessage('required')
            .isMongoId().withMessage('invalid mongo id')
        , body('content')
            .optional()
        , body('title')
            .optional()
            .isString().withMessage('is not a string')
            .isLength({min: 3, max: 30})
        , body('slug')
            .optional()
            .isSlug().withMessage('invalid slug')
        , body('featuredImage')
            .optional()
            .isMongoId().withMessage('invalid mongo id')
            .customSanitizer(Types.ObjectId)
        , body('category')
            .optional()
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

export default new Update();