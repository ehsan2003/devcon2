import {BaseController} from "@shared/utils";
import {RequestHandler} from "express";
import Category, {ICategoryDoc} from "@models/Category";

export type localRequestHandler = RequestHandler<{}, { msg: string, result: ICategoryDoc[] }, {}, {}>;

class All extends BaseController<localRequestHandler> {

    readonly access = null;
    readonly method = 'get';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            res.json({msg: 'success', result: await Category.find({})});
        })
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new All();