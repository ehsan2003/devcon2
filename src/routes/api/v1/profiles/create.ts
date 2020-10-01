import {BaseController, ErrorCodes, extractProps, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Profile, {IProfileDoc} from "@models/Profile";
import {IUserDoc} from "@models/User";
import {ConflictError} from "@shared/errors";

export type ProfilesCreateRequestHandler = RequestHandler<{}, { msg: string, result: IProfileDoc }, Pick<IProfileDoc, 'firstName' | 'lastName' | 'social' | 'bio' | 'slug'>, {}>;

class Create extends BaseController<ProfilesCreateRequestHandler> {

    readonly access = Roles.subscriber;
    readonly method = 'post';
    readonly path = '/';
    protected middleware: ProfilesCreateRequestHandler[]
        = [
        async (req, res) => {
            const user = req.user as IUserDoc;
            const profileExists = await Profile.findOne({user: user._id});
            if (profileExists)
                throw new ConflictError(ErrorCodes.PROFILE_CREATE_$_ALREADY_EXISTS, 'profile already exists you can edit it');
            const profile = new Profile({
                ...extractProps(req.body, 'firstName', 'lastName', 'social', 'bio', 'slug'),
                user: user._id
            });
            await profile.save().catch(this.handleUniqueError(ErrorCodes.PROFILE_CREATE_$_DUPLICATE_SLUG, 'handle already exists'));
            res.json({msg: 'success', result: profile});
        }
    ];

    protected validator: ValidationChain[] = [
        body('firstName')
            .exists().withMessage('required')
            .isString().withMessage('invalid string')
            .isLength({min: 2, max: 20}).withMessage('invalid length')
        , body('lastName')
            .optional()
            .isString().withMessage('invalid string')
            .isLength({min: 2, max: 20}).withMessage('invalid length')
        , body('social.*')
            .isURL().withMessage('invalid url')
        , body('bio')
            .exists().withMessage('required')
            .isString().withMessage('invalid string')
            .isLength({min: 10, max: 500})
        , body('slug')
            .exists().withMessage('required')
            .isSlug().withMessage('invalid slug')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Create();