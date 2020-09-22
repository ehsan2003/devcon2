import {BaseController} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Comment, {ICommentDoc} from '@models/Comment';
import {Types} from "mongoose";
import {ConflictError, NotFoundError} from "@shared/errors";
import Post from "@models/Post";

export type CommentsInsertUnauthorizedRequestHandler = RequestHandler<{}, { msg: string, result: ICommentDoc }, { email: string, name: string, content: string, post: Types.ObjectId, responseTo?: Types.ObjectId }, {}>;

class InsertUnauthorized extends BaseController<CommentsInsertUnauthorizedRequestHandler> {

    readonly access = null;
    readonly method = 'post';
    readonly path: string = '/unauthorized';
    protected middleware: CommentsInsertUnauthorizedRequestHandler[] = [
        (async (req, res, next) => {
            if (req.body.responseTo) {
                const parent = await Comment.findById(req.body.responseTo);
                if (!parent)
                    throw new NotFoundError('responseTo not found');
                if (!req.body.post.equals(parent.forPost))
                    throw new ConflictError('response post is not equal to parent post');
            }
            console.log(req.body);
            const commentDoc = new Comment({
                content: req.body.content,
                userData: {email: req.body.email, name: req.body.name},
                forPost: req.body.post,
                responseTo: req.body.responseTo
            });
            await commentDoc.save();
            res.json({msg: 'success', result: commentDoc});

        })
    ];

    protected validator: ValidationChain[] = [
        body('email')
            .exists().withMessage('email is required')
            .isEmail().withMessage('invalid email')
        , body('name')
            .exists().withMessage('name required')
            .isString().withMessage('name is not a string')
            .isLength({min: 3, max: 20})
        , body('content')
            .exists().withMessage('content is required')
            .isString().withMessage('content is not a string')
            .isLength({min: 5, max: 500})
        , body('post')
            .exists().withMessage('post required')
            .isMongoId().withMessage('invalid mongo id')
            .customSanitizer(Types.ObjectId)
            .custom((postId: Types.ObjectId) => Post.exists({_id: postId})).withMessage('post not found')
        , body('responseTo')
            .optional()
            .isMongoId().withMessage('invalid mongo id')
            .customSanitizer(Types.ObjectId)

    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new InsertUnauthorized();