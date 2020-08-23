import {BaseController} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Comment, {ICommentDoc} from '@models/Comment'
import {Types} from "mongoose";
import {NotFoundError} from "@shared/errors";

type localRequestHandler = RequestHandler<{}, { msg: string, result: ICommentDoc }, { email: string, name: string, content: string, post: Types.ObjectId, responseTo?: Types.ObjectId }, {}>

class InsertUnauthorized extends BaseController<localRequestHandler> {

    readonly access = null;
    readonly method = 'post';
    readonly path: string = '/unauthorized';
    protected middleware: localRequestHandler[] = [
        (async (req, res, next) => {
            if ((req.body.responseTo && !await Comment.exists({_id: req.body.responseTo})))
                throw new NotFoundError('responseTo not found');

            console.log(req.body)
            // todo add post exists checker
            const commentDoc = new Comment({
                content: req.body.content,
                userData: {email: req.body.email, name: req.body.name},
                forPost: req.body.post,
                responseTo: req.body.responseTo
            })
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