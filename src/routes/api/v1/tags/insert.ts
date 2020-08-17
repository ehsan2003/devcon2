import {BaseController,  Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Tag, {ITagDoc} from "@models/Tag";
import {Types} from "mongoose";

type localRequestHandler = RequestHandler<{}, { msg: string, result: ITagDoc }, { slug: string, id?: string }, {}>

class Insert extends BaseController<localRequestHandler> {

    readonly access = Roles.contributor;
    readonly method = 'post';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            const {slug, id} = req.body;
            const tag = await Tag.updateOne({_id: id || new Types.ObjectId()}, {slug: slug}, {upsert: true}).catch(this.handleUniqueError('duplicate slug or id'));
            res.json({msg: 'success', result: tag});
        })
    ];

    protected validator: ValidationChain[] = [
        body('slug')
            .exists().withMessage('slug required')
            .isSlug().withMessage('slug is invalid')
        , body('id')
            .optional()
            .isMongoId().withMessage('id is invalid')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Insert();