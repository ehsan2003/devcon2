import {BaseController} from "@shared/utils";
import {RequestHandler} from "express";
import {param, ValidationChain} from "express-validator";
import Profile, {IProfileDoc} from "@models/Profile";
import {NotFoundError} from "@shared/errors";

export type ProfilesGetSlugRequestHandler = RequestHandler<{ slug: string }, { msg: string, result: IProfileDoc }, {}, {}>;

class GetSlug extends BaseController<ProfilesGetSlugRequestHandler> {

    readonly access = null;
    readonly method = 'get';
    readonly path = '/:slug';
    protected middleware: ProfilesGetSlugRequestHandler[]
        = [
        async (req, res, next) => {
            const profile = await Profile.findOne({slug: req.params.slug});
            if (!profile)
                throw new NotFoundError('profile not found');
            res.json({msg: 'success', result: profile});

        }
    ];

    protected validator: ValidationChain[] = [
        param('slug')
            .isSlug().withMessage('invalid input')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new GetSlug();