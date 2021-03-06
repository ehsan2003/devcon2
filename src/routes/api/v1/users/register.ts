import {BaseController, ErrorCodes, extractProps, hashPassword, secureUserInfo, signJwt} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import User from "@models/User";

export type UsersRegisterRequestHandler = RequestHandler<{}, { msg: string, token: string, result: ReturnType<typeof secureUserInfo> }, { password: string, username: string, email: string }>;

class Register extends BaseController<UsersRegisterRequestHandler> {
    readonly access = null;
    readonly method: "all" | "get" | "post" | "put" | "delete" | "patch" | "options" | "head" = 'post';
    readonly path: string = '/';
    protected middleware: UsersRegisterRequestHandler[]
        = [
        async (req, res) => {
            const extracted = extractProps(req.body, 'email');
            const user = new User({...extracted, password: await hashPassword(req.body.password)});
            await user.save().catch(this.handleUniqueError(ErrorCodes.ERROR_USER_REGISTER_$_DUPLICATE, 'email already registered'));
            const jwtToken = signJwt(user);
            res.json({msg: 'success', token: jwtToken, result: secureUserInfo(user)});
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
        body('email')
            .exists().withMessage('email required')
            .isEmail().withMessage('email is invalid')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Register();