import {BaseController} from "@shared/utils";
import {RequestHandler} from "express";
import {ValidationChain} from "express-validator";
import {ITagDoc} from "@models/Tag";

type localRequestHandler = RequestHandler<{}, { msg: string, result: ITagDoc[] }, {}, { q: string }>

class Search extends BaseController<localRequestHandler> {

    readonly access = null;
    readonly method = 'get';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {

        })
    ];

    protected validator: ValidationChain[] = [];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Search();