import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, param, ValidationChain} from "express-validator";
import Comment from "@models/Comment";

export type CommentsVisibleRequestHandler = RequestHandler<{ commentId: string }, { msg: string, result: any }, { visible: boolean }, {}>;

class Visible extends BaseController<CommentsVisibleRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'put';
    readonly path: string = '/:commentId';
    protected middleware: CommentsVisibleRequestHandler[]
        = [
        (async (req, res) => {
            const {commentId} = req.params;
            const visible = req.body.visible;
            const comment = await Comment.findByIdAndUpdate(commentId, {$set: {visible: visible === void 0 ? true : visible}}, {new: true});
            res.json({msg: 'success', result: comment});
        })
    ];

    protected validator: ValidationChain[] = [
        param('commentId')
            .exists().withMessage('required')
            .isMongoId()
        , body('visible')
            .optional()
            .isBoolean()
            .toBoolean().withMessage('not assignable to boolean')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Visible();