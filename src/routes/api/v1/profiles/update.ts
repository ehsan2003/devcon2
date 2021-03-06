import {BaseController, ErrorCodes, extractProps, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Profile, {IProfileDoc} from "@models/Profile";
import {IUserDoc} from "@models/User";
import {NotFoundError} from "@shared/errors";

export type ProfilesUpdateRequestHandler = RequestHandler<{}, { msg: string, result: IProfileDoc }, Partial<Pick<IProfileDoc, 'firstName' | 'lastName' | 'social' | 'bio'>>, {}>;

class Update extends BaseController<ProfilesUpdateRequestHandler> {

    readonly access = Roles.subscriber;
    readonly method = 'put';
    readonly path = '/';
    protected middleware: ProfilesUpdateRequestHandler[]
        = [
        async (req, res) => {
            const user = req.user as IUserDoc;
            const profile = await Profile.findOneAndUpdate({user: user._id}
                , {$set: extractProps(req.body, 'firstName', 'lastName', 'social', 'bio')}
                , {new: true});
            if (!profile)
                throw new NotFoundError(ErrorCodes.ERROR_PROFILE_UPDATE_$_NOT_FOUND, 'profile not found');
            res.json({msg: 'success', result: profile});
        }
    ];

    protected validator: ValidationChain[] = [
        body('firstName')
            .optional()
            .isString().withMessage('invalid string')
            .isLength({min: 2, max: 20}).withMessage('invalid length')
        , body('lastName')
            .optional()
            .isString().withMessage('invalid string')
            .isLength({min: 2, max: 20}).withMessage('invalid length')
        , body('social.*')
            .isURL().withMessage('invalid url')
        , body('bio')
            .optional()
            .isString().withMessage('invalid string')
            .isLength({min: 10, max: 500})
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Update();