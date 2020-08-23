import {BaseController, checkPassword, signJwt,} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import User from "@models/User";
import {BadRequestError} from "@shared/errors";

type localRequestHandler = RequestHandler<{}, { msg: string, token: string }, { password: string, username: string, email: string }>;

class Login extends BaseController<localRequestHandler> {

    readonly access = null;
    readonly method = 'post';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            const {body:reqBody} = req;
            const user = await User.findOne({email: reqBody.email});
            if (!user)
                throw new BadRequestError(`user doesn't exists`);
            if (!await checkPassword(user, reqBody.password))
                throw new BadRequestError('password is not valid');
            else
                res.json({msg: 'success', token: signJwt(user)});

        })
    ];

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

export default new Login();