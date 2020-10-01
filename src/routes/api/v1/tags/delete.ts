import {BaseController, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {query, ValidationChain} from "express-validator";
import Tag from "@models/Tag";
import {NotFoundError} from "@shared/errors";
import {isValidObjectId, Query} from "mongoose";
import {Codes} from "../../../../@types";

type UnQuery<T> = T extends Query<infer R> ? R : any;
export type TagsDeleteRequestHandler = RequestHandler<{}, { msg: string, result: UnQuery<ReturnType<typeof Tag.deleteMany>> }, {}, { ids: string[] }>;

class Delete extends BaseController<TagsDeleteRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'delete';
    readonly path: string = '/';
    protected middleware: TagsDeleteRequestHandler[]
        = [
        (async (req, res) => {
            const {ids} = req.query;
            if (!await Tag.tagsExist(ids))
                throw new NotFoundError(Codes.TAGS_DELETE_$_NOT_FOUND, 'at least one of the tags does\'t exist');
            const result = await Tag.deleteMany({_id: {$in: ids}});
            res.json({msg: 'success', result});
        })
    ];

    protected validator: ValidationChain[] = [
        query('ids')
            .exists().withMessage('ids required')
            .isArray().withMessage('ids is not an array')
            .custom((ids) => ids.map((id: unknown) => isValidObjectId(id)).every((isValid: boolean) => isValid)).withMessage(`at least one of the ids is invalid`)
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Delete();