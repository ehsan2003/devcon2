import {BaseController, ErrorCodes, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Tag, {ITagDoc} from "@models/Tag";
import {Types} from "mongoose";

export type TagsInsertRequestHandler = RequestHandler<{}, { msg: string, result: ITagDoc }, { slug: string, id?: string }, {}>;

class Insert extends BaseController<TagsInsertRequestHandler> {

    readonly access = Roles.contributor;
    readonly method = 'post';
    readonly path: string = '/';
    protected middleware: TagsInsertRequestHandler[]
        = [
        (async (req, res) => {
            const {slug, id} = req.body;
            const tag = await Tag.updateOne({_id: id || new Types.ObjectId()}, {slug}, {upsert: true}).catch(this.handleUniqueError(ErrorCodes.ERROR_TAGS_INSERT_$_DUPLICATE_SLUG, 'duplicate slug'));
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