import {BaseController} from "@shared/utils";
import {RequestHandler} from "express";
import {param, ValidationChain} from "express-validator";
import Post, {IPostDoc} from "@models/Post";
import {NotFoundError} from "@shared/errors";

type localRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IPostDoc }, {}, {}>;

class Get extends BaseController<localRequestHandler> {
    readonly access = null;
    readonly method = 'get';
    readonly path = '/:id';
    protected middleware: localRequestHandler[]
        = [
        async (req, res, next) => {
            const post = await Post.findById(req.params.id);
            if (!post) {
                throw new NotFoundError('post not found');
            }
            res.json({msg: 'success', result: post});
        }
    ];

    protected validator: ValidationChain[] = [
        param('id')
            .exists().withMessage('required')
            .isMongoId().withMessage('invalid mongo id')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Get();