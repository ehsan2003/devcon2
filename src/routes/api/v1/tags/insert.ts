import {BaseController, handleUnique, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {ValidationChain} from "express-validator";
import Tag, {ITagDoc} from "@models/Tag";

type localRequestHandler = RequestHandler<{}, { msg: string, result: ITagDoc }, { slug: string, id?: string }, {}>

class Insert extends BaseController<localRequestHandler> {

    readonly access = Roles.contributor;
    readonly method = 'post';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            const {slug, id} = req.body;
            const tag = await Tag.updateOne({id: id}, {slug: slug}, {upsert: true}).catch(handleUnique('duplicate slug or id'));
            res.json({msg: 'success', result: tag});
        })
    ];

    protected validator: ValidationChain[] = [];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Insert();