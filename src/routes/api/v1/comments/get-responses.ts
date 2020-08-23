import {BaseController} from "@shared/utils";
import {RequestHandler} from "express";
import {ValidationChain} from "express-validator";
import Comment, {ICommentDoc} from "@models/Comment";
import {Types} from "mongoose";
import {NotFoundError} from "@shared/errors";

type localRequestHandler = RequestHandler<{ id: string }, { msg: string, result: ICommentDoc[] }, {}, {}>

class GetResponses extends BaseController<localRequestHandler> {

    readonly access = null;
    readonly method = 'get';
    readonly path: string = '/:id';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            const result = await Comment.aggregate([
                {
                    $match: {
                        _id: new Types.ObjectId('5f42465fa7bc8055a2eaf522')
                    }
                }, {
                    $graphLookup: {
                        from: 'comments',
                        startWith: '$_id',
                        connectFromField: '_id',
                        connectToField: 'responseTo',
                        as: 'responses',
                        depthField: 'depth'
                    }
                }, {
                    $unwind: {
                        path: '$responses'
                    }
                }, {
                    $replaceRoot: {
                        newRoot: '$responses'
                    }
                }
            ]);
            if (!result.length)
                throw new NotFoundError('comments not found')
            res.json({msg: 'success', result});

        })
    ];

    protected validator: ValidationChain[] = [];

    constructor() {
        super();
        this.initialize();
    }
}

export default new GetResponses();