import {BaseController, extractProps, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {ValidationChain} from "express-validator";
import Post, {IPostDoc} from "@models/Post";
import {IUserDoc} from "@models/User";

type localRequestHandler = RequestHandler<{}, { msg: string, result: IPostDoc }, Pick<IPostDoc, 'content' | 'title' | 'slug' | 'featuredImage' | 'category' | 'tags'>, {}>;

class Insert extends BaseController<localRequestHandler> {

    readonly access = Roles.contributor;
    readonly method = 'post';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            const result = new Post({
                    ...extractProps(req.body, 'content', 'title', 'slug', 'featuredImage', 'category', 'tags'),
                    author: (req.user as IUserDoc)._id
                }
            );
            await result.save().catch(this.handleUniqueError('duplicate slug'));
            res.json({msg: 'success', result});
        })
    ];

    protected validator: ValidationChain[] = [];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Insert();