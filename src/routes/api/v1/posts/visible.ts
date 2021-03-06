import {BaseController, ErrorCodes, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Post, {IPostDoc} from "@models/Post";
import {AccessForbiddenError, NotFoundError} from "@shared/errors";
import {IUserDoc} from "@models/User";

export type PostsVisibleRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IPostDoc }, { visible?: boolean }, {}>;

class Visible extends BaseController<PostsVisibleRequestHandler> {

    readonly access = Roles.author;
    readonly method = 'put';
    readonly path = '/:id';
    protected middleware: PostsVisibleRequestHandler[]
        = [
        async (req, res, next) => {
            const user = req.user as IUserDoc;
            const post = await Post.findById(req.params.id);
            if (!post)
                throw new NotFoundError(ErrorCodes.ERROR_POST_VISIBLE_$_POST_NOT_FOUND, 'post not found');
            if (user.role === Roles.author && !post.author.equals(user._id))
                throw new AccessForbiddenError(ErrorCodes.ERROR_POST_VISIBLE_$_ACCESS_FORBIDDEN, `you can't make this post visible`);
            req.data = post;
            next();
        },
        async (req, res) => {
            const post = req.data as IPostDoc;
            post.visible = req.body.visible || true;
            res.json({msg: 'success', result: post});
        }
    ];

    protected validator: ValidationChain[] = [
        body('visible')
            .optional()
            .isBoolean()
            .toBoolean().withMessage('invalid boolean')

    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Visible();