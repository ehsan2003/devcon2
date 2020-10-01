import {BaseController, ErrorCodes, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {param, ValidationChain} from "express-validator";
import Post, {IPostDoc} from "@models/Post";
import {IUserDoc} from "@models/User";
import {AccessForbiddenError, NotFoundError} from "@shared/errors";

export type PostsDeleteRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IPostDoc }, {}, {}>;

class Delete extends BaseController<PostsDeleteRequestHandler> {

    readonly access = Roles.contributor;
    readonly method = 'delete';
    readonly path = '/:id';
    protected middleware: PostsDeleteRequestHandler[]
        = [async (req, res, next) => {
        const user = req.user as IUserDoc;
        const post = await Post.findById(req.params.id);
        if (!post)
            throw new NotFoundError(ErrorCodes.POST_DELETE_$_NOT_FOUND, 'post not found');
        if (post.visible && user.role === Roles.contributor)
            throw new AccessForbiddenError(ErrorCodes.POST_DELETE_$_ACCESS_FORBIDDEN, 'deleting this post is not permitted by you');
        req.data = post;
        next();
    }
        , async (req, res) => {
            const post = req.data as IPostDoc;
            await post.remove();
            res.json({msg: 'success', result: post});
        }
    ];

    protected validator: ValidationChain[] = [
        param('id')
            .exists().withMessage('required')
            .isMongoId().withMessage('invalid mongo id')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Delete();