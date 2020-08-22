import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {ValidationChain} from "express-validator";
import Comment from "@models/Comment";
import {NotFoundError} from "@shared/errors";

type localRequestHandler = RequestHandler<{ comment: string }, { msg: string, result: any }, {}, {}>

class Remove extends BaseController<localRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'delete';
    readonly path: string = '/:comment';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            const commendId = req.params.comment;
            const result = await Comment.findByIdAndDelete(commendId);
            if (!result)
                throw new NotFoundError('comment not found');
            res.json({msg: 'success', result})
        })
    ];

    protected validator: ValidationChain[] = [];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Remove();