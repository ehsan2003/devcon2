import {BaseController, Roles, secureUserInfo, verifyByToken} from "@shared/utils";
import {RequestHandler} from "express";
import {param, ValidationChain} from "express-validator";
import {verificationTypes} from "@models/Verification";
import {BadRequestError} from "@shared/errors";

export type UsersVerifyTokenRequestHandler = RequestHandler<{ token: string }, { msg: string, result: ReturnType<typeof secureUserInfo> }, {}, {}>;

class VerifyToken extends BaseController<UsersVerifyTokenRequestHandler> {

    readonly access = null;
    readonly method = 'get';
    readonly path: string = '/:token';
    protected middleware: UsersVerifyTokenRequestHandler[]
        = [
        (async (req, res) => {
            const {token} = req.params;
            const verifyAbleUser = await verifyByToken(token, verificationTypes.emailVerification);
            if (!verifyAbleUser)
                throw new BadRequestError('invalid token');
            verifyAbleUser.role = Roles.subscriber;
            await verifyAbleUser.save();
            res.json({msg: 'success', result: secureUserInfo(verifyAbleUser)});
        })
    ];

    protected validator: ValidationChain[] = [
        param('token')
            .exists().withMessage('token required')
            .isString().withMessage('token is not a string')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new VerifyToken();