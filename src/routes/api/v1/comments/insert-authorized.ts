import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Comment, {ICommentDoc} from "@models/Comment";
import {Types} from "mongoose";
import {Middleware} from "express-validator/src/base";
import {IUserDoc} from "@models/User";
import {ConflictError, NotFoundError} from "@shared/errors";
import Post from "@models/Post";

type localRequestHandler = RequestHandler<{}, { msg: string, result: ICommentDoc }, {
    content: string, responseTo?: Types.ObjectId, post: Types.ObjectId
}, {}>;

class InsertAuthorized extends BaseController<localRequestHandler> {

    readonly access = Roles.unverified;
    readonly method = 'post';
    readonly path: string = '/authorized';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            const user = req.user as IUserDoc;
            const reqBody = req.body;
            if (reqBody.responseTo) {
                const parent = await Comment.findById(reqBody.responseTo);
                if (!parent)
                    throw new NotFoundError('responseTo not found');
                if (!reqBody.post.equals(parent.forPost))
                    throw new ConflictError('response post is not equal to parent post');
            }

            const comment = new Comment({
                content: reqBody.content
                , userData: {user: user.id}
                , responseTo: reqBody.responseTo
                , forPost: reqBody.post
            });
            await comment.save();
            res.json({msg: 'success', result: comment});

        })
    ];

    protected validator: ValidationChain[] | Middleware = [
        body('content')
            .exists().withMessage('content is required')
            .isString().withMessage('content is not a string')
            .isLength({min: 5, max: 500})
        , body('post')
            .exists().withMessage('required')
            .isMongoId().withMessage('invalid mongo id')
            .customSanitizer(Types.ObjectId)
            .custom((postId:Types.ObjectId)=>Post.exists({_id:postId})).withMessage('post not found')
        , body('responseTo')
            .optional()
            .isMongoId().withMessage('invalid mongoId')
            .customSanitizer(Types.ObjectId)
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new InsertAuthorized();