import {BaseController} from "@shared/utils";
import {RequestHandler} from "express";
import {param, ValidationChain} from "express-validator";
import Post, {IPostDocSharable} from "@models/Post";
import {NotFoundError} from "@shared/errors";
import {Types} from "mongoose";
import {Codes} from "../../../../@types";

export type PostsGetRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IPostDocSharable }, {}, {}>;

class Get extends BaseController<PostsGetRequestHandler> {
    readonly access = null;
    readonly method = 'get';
    readonly path = '/:id';
    protected middleware: PostsGetRequestHandler[]
        = [
        async (req, res) => {
            const post = (await Post.preparePostForClient({_id: Types.ObjectId(req.params.id)}))[0];
            if (!post) {
                throw new NotFoundError(Codes.POSTS_GET_NOT_FOUND, 'post not found');
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