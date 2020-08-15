import {BaseController, checkPassword, hashPassword, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {body, ValidationChain} from "express-validator";
import {IUserDoc} from "@models/User";
import {BadRequestError} from "@shared/errors";

type localRequestHandler = RequestHandler<{}, { msg: string }, { password: string, new: string }, {}>

class ChangePassword extends BaseController<localRequestHandler> {

    readonly access = Roles.unverified;
    readonly method = 'post';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            const {body} = req;
            const user = req.user as IUserDoc;
            if (!await checkPassword(user, body.password))
                throw new BadRequestError('password is invalid');
            user.password = await hashPassword(body.new);
            await user.save();
            res.json({msg: 'success'});

        })
    ];

    protected validator: ValidationChain[] = [];

    constructor() {
        super();
        this.initialize();
    }
}

export default new ChangePassword();