import {BaseController, Roles, secureUserInfo} from "@shared/utils";
import {RequestHandler} from "express";
import {ValidationChain} from "express-validator";
import {IUserDoc} from "@models/User";

export type localRequestHandler = RequestHandler<{}, { msg: string, result: ReturnType<typeof secureUserInfo> }, {}, {}>;

class Current extends BaseController<localRequestHandler> {

    readonly access = Roles.unverified;
    readonly method = 'get';
    readonly path: string = '/';
    protected middleware: localRequestHandler[]
        = [
        (async (req, res, next) => {
            res.json({msg: 'success', result: secureUserInfo(req.user as IUserDoc)});
        })
    ];

    protected validator: ValidationChain[] = [];

    constructor() {
        super();
        this.initialize();
    }
}

export default new Current();