import {BaseController, ErrorCodes, getRandomToken, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {ValidationChain} from "express-validator";
import {IUserDoc} from "@models/User";
import Verification, {verificationTypes} from "@models/Verification";

export type UsersVerifySendRequestHandler = RequestHandler<{}, { msg: string }, {}, {}>;

class VerifySend extends BaseController<UsersVerifySendRequestHandler> {
    exactAccess = true;
    readonly access = Roles.unverified;
    readonly method = 'get';
    readonly path: string = '/';
    protected middleware: UsersVerifySendRequestHandler[]
        = [
        async (req, res) => {
            const user = req.user as IUserDoc;
            const verificationDoc = new Verification({
                token: await getRandomToken(),
                data: {for: verificationTypes.emailVerification, email: user.email}
            });
            await verificationDoc.save().catch(this.handleUniqueError(ErrorCodes.ERROR_USER_VERIFICATION_$_DUPLICATE_VERIFICATION_DATA, 'duplicate verification data'));
            console.log(verificationDoc.token); // todo add email sender method
            res.json({msg: 'success'});
        }
    ];

    protected validator: ValidationChain[] = [];

    constructor() {
        super();
        this.initialize();
    }
}

export default new VerifySend();