import {BaseController, handleUnique, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Category, {ICategoryDoc} from "@models/Category";

type localRequestHandler = RequestHandler<{}, { msg: string, result: ICategoryDoc }, { slug: string, enName: string, parent?: string }, {}>

class Insert extends BaseController<localRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'post';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            const {body} = req;
            const category = new Category({
                slug: body.slug,
                enName: body.enName,
                parent: body.parent || null
            })
            await category.save().catch(handleUnique('duplicate slug'));
            res.json({msg: 'success', result: category});
        })
    ];

    protected validator: ValidationChain[] = [];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Insert();