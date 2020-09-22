import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {param, ValidationChain} from "express-validator";
import Post, {IPostDocSharable} from "@models/Post";
import {IUserDoc} from "@models/User";
import {Types} from "mongoose";
import {ConflictError, NotFoundError} from "@shared/errors";

export type PostsLikeRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IPostDocSharable }, {}, {}>;

class Like extends BaseController<PostsLikeRequestHandler> {

    readonly access = Roles.subscriber;
    readonly method = 'put';
    readonly path = '/:id';
    protected middleware: PostsLikeRequestHandler[]
        = [
        async (req, res, next) => {
            const id = Types.ObjectId(req.params.id);
            const result = await Post.updateOne({_id: id}, {$addToSet: {likes: (req.user as IUserDoc).id}});
            if (result.nMatched === 0)
                throw new NotFoundError('post not found');
            if (result.nModified === 0)
                throw new ConflictError('already liked');
            const updatedPost = await Post.preparePostForClient({_id: id});

            res.json({msg: 'success', result: updatedPost[0]});
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

export default new Like();