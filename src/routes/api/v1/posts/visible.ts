import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Post, {IPostDoc} from "@models/Post";
import {AccessForbiddenError, NotFoundError} from "@shared/errors";
import {IUserDoc} from "@models/User";

type localRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IPostDoc }, { visible?: boolean }, {}>;

class Visible extends BaseController<localRequestHandler> {

    readonly access = Roles.author;
    readonly method = 'put';
    readonly path = '/:id';
    protected middleware: localRequestHandler[]
        = [
        async (req, res, next) => {
            const user = req.user as IUserDoc;
            const post = await Post.findById(req.params.id);
            if (!post)
                throw new NotFoundError('post not found');
            if (user.role === Roles.author && !post.author.equals(user._id))
                throw new AccessForbiddenError(`you can't make this post visible`);
            req.data = post;
            next();
        },
        async (req, res, next) => {
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