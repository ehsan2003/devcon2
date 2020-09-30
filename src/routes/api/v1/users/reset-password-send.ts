import {BaseController, getRandomToken} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import Verification, {verificationTypes} from "@models/Verification";
import User from "@models/User";
import {NotFoundError} from "@shared/errors";

export type UsersResetPasswordSendRequestHandler = RequestHandler<{}, { msg: string }, { email: string }, {}>;

class ResetPasswordSend extends BaseController<UsersResetPasswordSendRequestHandler> {

    readonly access = null;
    readonly method = 'post';
    readonly path: string = '/';
    protected middleware: UsersResetPasswordSendRequestHandler[]
        = [
        (async (req, res) => {
            const {email} = req.body;
            if (!await User.exists({email}))
                throw new NotFoundError('user not found');
            const verificationDoc = new Verification({
                token: await getRandomToken()
                , data: {for: verificationTypes.resetPassword, email}
            });
            await verificationDoc.save().catch(this.handleUniqueError('duplicate verification data'));
            console.log(verificationDoc.token);
            res.json({msg: 'success'});
        })
    ];

    protected validator: ValidationChain[] = [
        body('email')
            .exists().withMessage('email required')
            .isEmail().withMessage('invalid email')
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new ResetPasswordSend();