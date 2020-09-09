import {BaseController, extractProps, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Profile, {IProfileDoc} from "@models/Profile";
import {IUserDoc} from "@models/User";

type localRequestHandler = RequestHandler<{}, { msg: string, result: IProfileDoc }, Pick<IProfileDoc, 'firstName' | 'lastName' | 'social' | 'bio' | 'slug'>, {}>;

class Create extends BaseController<localRequestHandler> {

    readonly access = Roles.subscriber;
    readonly method = 'post';
    readonly path = '/';
    protected middleware: localRequestHandler[]
        = [
        async (req, res, next) => {
            const user = req.user as IUserDoc;
            let profile = await Profile.findOne({user: user._id});
            if (!profile) {
                profile = new Profile(extractProps(req.body, 'firstName', 'lastName', 'social', 'bio', 'slug'));
            } else {
                Object.assign(profile, extractProps(req.body, 'firstName', 'lastName', 'social', 'bio'));
            }
            await profile.save();
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