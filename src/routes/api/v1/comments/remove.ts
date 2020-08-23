import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {query, ValidationChain} from "express-validator";
import Comment from "@models/Comment";
import {isValidObjectId} from "mongoose";

type localRequestHandler = RequestHandler<{ comment: string }, { msg: string, result: any }, {}, { comments: string[] }>

class Remove extends BaseController<localRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'delete';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            const commendIds = req.query.comments;
            const result = await Comment.deleteMany({_id: {$in: commendIds}});
            res.json({msg: 'success', result})
        })
    ];

    protected validator: ValidationChain[] = [
        query('comments')
            .exists().withMessage('required')
            .isArray({min: 1}).withMessage('invalid array')
            .custom((array: unknown[]) => array.every(isValidObjectId)).withMessage('invalid mongo ids')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Remove();