import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {param, ValidationChain} from "express-validator";
import Post, {IPostDocSharable} from "@models/Post";
import {IUserDoc} from "@models/User";
import {Types} from "mongoose";
import {NotFoundError} from "@shared/errors";

type localRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IPostDocSharable }, {}, {}>;
class Like extends BaseController<localRequestHandler> {

    readonly access = Roles.subscriber;
    readonly method = 'put';
    readonly path = '/:id';
    protected middleware: localRequestHandler[]
        = [
        async (req, res, next) => {
            const id = Types.ObjectId(req.params.id);
            const result = await Post.updateOne({_id: id}, {$addToSet: {likes: (req.user as IUserDoc).id}});
            if (result.nMatched === 0)
                throw new NotFoundError('post not found');

            const updatedPost = await Post.mapLikesToNumber({_id: id});

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