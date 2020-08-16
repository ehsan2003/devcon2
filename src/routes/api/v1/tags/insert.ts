import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {ValidationChain} from "express-validator";
import {ITagDoc} from "@models/Tag";

type localRequestHandler = RequestHandler<{}, { msg: string, result: ITagDoc }, { slug: string }, {}>

class Insert extends BaseController<localRequestHandler> {

    readonly access = Roles.contributor;
    readonly method = 'post';
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

export default new Insert();