import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Comment, {ICommentDoc} from "@models/Comment";
import {Types} from "mongoose";
import {Middleware} from "express-validator/src/base";
import {IUserDoc} from "@models/User";
import {NotFoundError} from "@shared/errors";

type localRequestHandler = RequestHandler<{}, { msg: string, result: ICommentDoc }, {
    content: string, responseTo?: Types.ObjectId, post: Types.ObjectId
}, {}>

class InsertAuthorized extends BaseController<localRequestHandler> {

    readonly access = Roles.unverified;
    readonly method = 'post';
    readonly path: string = '/authorized';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            // todo add post exists checker
            const user = req.user as IUserDoc;
            const body = req.body;
            if (body.responseTo && !await Comment.exists({_id: req.body.responseTo}))
                throw new NotFoundError('responseTo not found')

            const comment = new Comment({
                content: body.content
                , userData: {user: user.id}
                , responseTo: body.responseTo
                , forPost: body.post
            })
            await comment.save()
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