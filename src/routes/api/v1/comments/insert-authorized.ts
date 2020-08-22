import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Comment, {ICommentDoc} from "@models/Comment";
import {isValidObjectId, Types} from "mongoose";
import {Middleware} from "express-validator/src/base";
import {IUserDoc} from "@models/User";
import {Request} from 'express-serve-static-core'

type localRequestHandler = RequestHandler<{}, { msg: string, result: ICommentDoc }, {
    email?: string, name?: string, content: string, responseTo: string | null, forPost: string
}, {}>

class InsertAuthorized extends BaseController<localRequestHandler> {

    readonly access = Roles.unverified;
    readonly method = 'post';
    readonly path: string = '/authorized';
    protected middleware: localRequestHandler[]
        = [
        (async (req: Request, res, next) => {
            // todo add post exists checker
            const user = req.user as IUserDoc;
            const {body} = req;
            const comment = new Comment({
                content: body.content
                , userData: {user: user.id}
                , responseTo: body.responseTo ? new Types.ObjectId(body.responseTo) : null
                , forPost: Types.ObjectId(body.forPost)
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
            .exists().withMessage('post required')
            .isMongoId().withMessage('invalid mongo id')
        , body('responseTo')
            .exists().withMessage('responseTo required')
            .custom(val => val === null || isValidObjectId(val)).withMessage('invalid value')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new InsertAuthorized();