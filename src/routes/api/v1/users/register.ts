import {BaseController, extractProps,  hashPassword, secureUserInfo, signJwt} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import User from "@models/User";

type localRequestHandler = RequestHandler<{}, { msg: string, token: string, result: ReturnType<typeof secureUserInfo> }, { password: string, username: string, email: string }>;

class register extends BaseController<localRequestHandler> {
    readonly access = null;
    readonly method: "all" | "get" | "post" | "put" | "delete" | "patch" | "options" | "head" = 'post';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        async (req, res, next) => {
            const extracted = extractProps(req.body, 'email', 'username');
            const user = new User({...extracted, password: await hashPassword(req.body.password)});
            await user.save().catch(this.handleUniqueError('username or email is not unique'))
            const jwtToken = signJwt(user)
            res.json({msg: 'success', token: jwtToken, result: secureUserInfo(user)})
        }
    ]
    ;
    protected validator: ValidationChain[] = [
        body('password')
            .exists().withMessage('password is required')
            .isString().withMessage('password is not a string')
            .isLength({min: 8, max: 100}).withMessage('password length should be between 8 and 100')
            .matches(/\d/).withMessage('password should contains number')
            .matches(/\w/).withMessage('password should contains letters'),
        body('username')
            .exists().withMessage('username required')
            .isString().withMessage('username is not a string')
            .isSlug().withMessage('username is not a slug')
            .isLength({min: 3, max: 20}).withMessage('username length should be between 3 and 20'),
        body('email')
            .exists().withMessage('email required')
            .isEmail().withMessage('email is invalid')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new register();