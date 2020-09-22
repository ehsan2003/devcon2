import {BaseController} from "@shared/utils";
import {RequestHandler} from "express";
import {param, ValidationChain} from "express-validator";
import Profile, {IProfileDoc} from "@models/Profile";
import {NotFoundError} from "@shared/errors";

export type localRequestHandler = RequestHandler<{ id: string }, { msg: string, result: IProfileDoc }, {}, {}>;

class GetId extends BaseController<localRequestHandler> {

    readonly access = null;
    readonly method = 'get';
    readonly path = '/:id';
    protected middleware: localRequestHandler[]
        = [
        async (req, res, next) => {
            const profile = await Profile.findById(req.params.id);
            if (!profile)
                throw new NotFoundError('profile not found');
            res.json({msg: 'success', result: profile});

        }
    ];

    protected validator: ValidationChain[] = [
        param('id')
            .isMongoId().withMessage('invalid mongo id')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new GetId();