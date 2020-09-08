import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {param, ValidationChain} from "express-validator";
import Post, {IPostDocSharable} from "@models/Post";
import {Types} from "mongoose";
import {IUserDoc} from "@models/User";
import {ConflictError, NotFoundError} from "@shared/errors";

type localRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IPostDocSharable }, {}, {}>;
class Dislike extends BaseController<localRequestHandler> {

    readonly access = Roles.subscriber;
    readonly method = 'put';
    readonly path = '/:id';
    protected middleware: localRequestHandler[]
        = [
        async (req, res, next) => {
            const id = Types.ObjectId(req.params.id);
            const result = await Post.updateOne({_id: id}, {$pull: {likes: (req.user as IUserDoc)._id}});
            if (result.nMatched === 0)
                throw new NotFoundError('post not found');
            if (result.nModified === 0)
                throw new ConflictError('disliking when like is absent');
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

export default new Dislike();