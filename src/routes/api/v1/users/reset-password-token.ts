import {BaseController, ErrorCodes, hashPassword, verifyByToken} from "@shared/utils";
import {RequestHandler} from "express";
import {body, param, ValidationChain} from "express-validator";
import {verificationTypes} from "@models/Verification";
import {BadRequestError} from "@shared/errors";

export type UsersResetPasswordTokenRequestHandler = RequestHandler<{ token: string }, { msg: string }, { newPassword: string }, {}>;

class ResetPasswordToken extends BaseController<UsersResetPasswordTokenRequestHandler> {

    readonly access = null;
    readonly method = 'post';
    readonly path: string = '/:token';
    protected middleware: UsersResetPasswordTokenRequestHandler[]
        = [
        (async (req, res) => {
            const {token} = req.params;
            const {newPassword} = req.body;
            const verificationResult = await verifyByToken(token, verificationTypes.resetPassword);
            if (!verificationResult)
                throw new BadRequestError(ErrorCodes.ERROR_USER_RESET_PASSWORD_$_INVALID_TOKEN, 'invalid token');
            verificationResult.password = await hashPassword(newPassword);
            await verificationResult.save();
            res.json({msg: 'success'});
        })
    ];

    protected validator: ValidationChain[] = [
        body('newPassword')
            .exists().withMessage('newPassword is required')
            .isString().withMessage('newPassword is not a string')
            .isLength({min: 8, max: 100}).withMessage('newPassword length should be between 8 and 100')
            .matches(/\d/).withMessage('newPassword should contains number')
            .matches(/\w/).withMessage('newPassword should contains letters')
        , param('token')
            .exists().withMessage('token is required')
            .isString().withMessage('token is not a string')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new ResetPasswordToken();