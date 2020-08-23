import {BaseController, getRandomToken,  Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {ValidationChain} from "express-validator";
import {IUserDoc} from "@models/User";
import Verification, {verificationTypes} from "@models/Verification";

type localRequestHandler = RequestHandler<{}, { msg: string }, {}, {}>;

class VerifySend extends BaseController<localRequestHandler> {
    exactAccess = true;
    readonly access = Roles.unverified;
    readonly method = 'get';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        async (req, res, next) => {
            const user = req.user as IUserDoc;
            const verificationDoc = new Verification({
                token: await getRandomToken(),
                data: {for: verificationTypes.emailVerification, email: user.email}
            });
            await verificationDoc.save().catch(this.handleUniqueError('duplicate verification data'));
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