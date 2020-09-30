import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, param, ValidationChain} from "express-validator";
import Comment from "@models/Comment";

export type CommentsUpdateRequestHandler = RequestHandler<{ id: string }, { msg: string, result: any }, { content: string }, {}>;

class Update extends BaseController<CommentsUpdateRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'put';
    readonly path: string = '/:id';
    protected middleware: CommentsUpdateRequestHandler[]
        = [
        (async (req, res) => {
            const id = req.params.id;
            const result = await Comment.findByIdAndUpdate(id, {$set: {content: req.body.content}}, {new: true});
            res.json({msg: 'success', result});
        })
    ];

    protected validator: ValidationChain[] = [
        param('id')
            .exists().withMessage('required')
            .isMongoId().withMessage('invalid mongo id')
        , body('content')
            .exists().withMessage('required')
            .isString().withMessage('required')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Update();