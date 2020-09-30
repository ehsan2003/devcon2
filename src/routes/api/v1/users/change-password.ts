import {BaseController, checkPassword, hashPassword, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import {IUserDoc} from "@models/User";
import {BadRequestError} from "@shared/errors";

export type UsersChangePasswordRequestHandler = RequestHandler<{}, { msg: string }, { password: string, new: string }, {}>;

class ChangePassword extends BaseController<UsersChangePasswordRequestHandler> {

    readonly access = Roles.unverified;
    readonly method = 'post';
    readonly path: string = '/';
    protected middleware: UsersChangePasswordRequestHandler[]
        = [
        (async (req, res) => {
            const user = req.user as IUserDoc;
            if (!await checkPassword(user, req.body.password))
                throw new BadRequestError('password is invalid');
            user.password = await hashPassword(req.body.new);
            await user.save();
            res.json({msg: 'success'});

        })
    ];

    protected validator: ValidationChain[] = [
        body('password')
            .exists().withMessage('password is required')
            .isString().withMessage('password is not a string')
        , body('new')
            .exists().withMessage('password is required')
            .isString().withMessage('password is not a string')
            .isLength({min: 8, max: 100}).withMessage('password length should be between 8 and 100')
            .matches(/\d/).withMessage('password should contains number')
            .matches(/\w/).withMessage('password should contains letters'),
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new ChangePassword();