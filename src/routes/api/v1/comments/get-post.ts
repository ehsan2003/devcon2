import {BaseController} from "@shared/utils";
import {RequestHandler} from "express";
import {ValidationChain} from "express-validator";
import Comment, {ICommentDoc} from "@models/Comment";
import {Types} from "mongoose";
import {NotFoundError} from "@shared/errors";

export type CommentsGetPostRequestHandler = RequestHandler<{ id: string }, { msg: string, result: (ICommentDoc & { responses: number })[] }, {}, {}>;

class GetPost extends BaseController<CommentsGetPostRequestHandler> {

    readonly access = null;
    readonly method = 'get';
    readonly path: string = '/:id';
    protected middleware: CommentsGetPostRequestHandler[]
        = [
        (async (req, res) => {
            const result = await Comment.aggregate().match({
                visible: true,
                forPost: Types.ObjectId(req.params.id),
                responseTo: null
            }).lookup({
                from: 'comments',
                localField: '_id',
                foreignField: 'responseTo',
                as: 'responses'
            }).addFields({
                responses: {$size: '$responses'}
            });
            if (!result.length)
                throw new NotFoundError('comments not found');
            res.json({msg: 'success', result});

        })
    ];

    protected validator: ValidationChain[] = [];

    constructor() {
        super();
        this.initialize();
    }
}

export default new GetPost();