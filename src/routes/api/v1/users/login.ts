import {BaseController, checkPassword, ErrorCodes, signJwt,} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import User from "@models/User";
import {BadRequestError} from "@shared/errors";

export type UsersLoginRequestHandler = RequestHandler<{}, { msg: string, token: string }, { password: string, username: string, email: string }>;

class Login extends BaseController<UsersLoginRequestHandler> {

    readonly access = null;
    readonly method = 'post';
    readonly path: string = '/';
    protected middleware: UsersLoginRequestHandler[]
        = [
        (async (req, res) => {
            const {body: reqBody} = req;
            const user = await User.findOne({email: reqBody.email});
            if (!user)
                throw new BadRequestError(ErrorCodes.ERROR_USER_LOGIN_$_INVALID_EMAIL, `user doesn't exists`);
            if (!await checkPassword(user, reqBody.password))
                throw new BadRequestError(ErrorCodes.ERROR_USER_LOGIN_$_INVALID_PASSWORD, 'password is not valid');
            else
                res.json({msg: 'success', token: signJwt(user)});

        })
    ];

    protected validator: ValidationChain[] = [
        body('password')
            .exists().withMessage('password is required')
            .isString().withMessage('password is not a string'),
        body('email')
            .exists().withMessage('email required')
            .isEmail().withMessage('email is invalid')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Login();