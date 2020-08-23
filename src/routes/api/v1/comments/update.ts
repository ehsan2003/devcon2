import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, param, ValidationChain} from "express-validator";
import Comment from "@models/Comment";

type localRequestHandler = RequestHandler<{ id: string }, { msg: string, result: any }, { content: string }, {}>;

class Update extends BaseController<localRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'put';
    readonly path: string = '/:id';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
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