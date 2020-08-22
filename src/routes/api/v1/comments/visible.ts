import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {ValidationChain} from "express-validator";
import Comment from "@models/Comment";

type localRequestHandler = RequestHandler<{ commentId: string }, { msg: string, result: any }, { visible: boolean }, {}>

class Visible extends BaseController<localRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'put';
    readonly path: string = '/:commentId';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            const {commentId} = req.params;
            const comment = await Comment.findByIdAndUpdate(commentId, {$set: {visible: req.body.visible}});
            res.json({msg: 'success', result: comment});
        })
    ];

    protected validator: ValidationChain[] = [];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Visible();