import {BaseController} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Comment, {ICommentDoc} from '@models/Comment'
import {isValidObjectId, Types} from "mongoose";

type localRequestHandler = RequestHandler<{}, { msg: string, result: ICommentDoc }, { email: string, name: string, content: string, post: string, responseTo: string | null }, {}>

class InsertUnauthorized extends BaseController<localRequestHandler> {

    readonly access = null;
    readonly method = 'post';
    readonly path: string = '/unauthorized';
    protected middleware: localRequestHandler[] = [
        (async (req, res, next) => {
            console.log(req.body)
            // todo add post exists checker
            const commentDoc = new Comment({
                responseTo: req.body.responseTo,
                content: req.body.content,
                userData: {email: req.body.email, name: req.body.name},
                forPost: new Types.ObjectId(req.body.post)
            })
            commentDoc.responseTo=req.body.responseTo?new Types.ObjectId(req.body.responseTo):null;
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
        , body('responseTo')
            .exists().withMessage('responseTo required')
            .custom(val => val === null || isValidObjectId(val)).withMessage('invalid value')

    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new InsertUnauthorized();