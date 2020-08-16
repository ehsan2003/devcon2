import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {ValidationChain} from "express-validator";
import Tag from "@models/Tag";
import {NotFoundError} from "@shared/errors";
import {Query} from "mongoose";

type UnQuery<T> = T extends Query<infer R> ? R : any;
type localRequestHandler = RequestHandler<{}, { msg: string, result: UnQuery<ReturnType<typeof Tag.deleteMany>> }, {}, { ids: string[] }>

class Delete extends BaseController<localRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'delete';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            const {ids} = req.query;
            if (!await Tag.tagsExist(ids))
                throw new NotFoundError('at least one of the tags does\'t exist');
            const result = await Tag.deleteMany({_id: {$in: ids}});
            res.json({msg: 'success', result})
        })
    ];

    protected validator: ValidationChain[] = [];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Delete();