import {BaseController, ErrorCodes, Roles} from "@shared/utils";
import {RequestHandler} from "express";
import {param, ValidationChain} from "express-validator";
import {IUserDoc} from "@models/User";
import {AccessForbiddenError} from "@shared/errors";

type roleStrings = 'subscriber' | 'administrator' | 'contributor' | 'editor' | 'superAdmin' | 'unverified';
export type localRequestHandler = RequestHandler<{ role: roleStrings }, { msg: string }, {}, {}>;

class FileProtection extends BaseController<localRequestHandler> {

    readonly access = Roles.unverified;
    readonly method = 'get';
    readonly path = '/protected/:role/*';
    protected middleware: localRequestHandler[]
        = [
        async (req, res, next) => {
            const accessRole = Roles[req.params.role];
            const user = req.user as IUserDoc;
            if (user.role < accessRole)
                throw new AccessForbiddenError(ErrorCodes.ERROR_FILE_PROTECTION_$_FILE_INACCESSIBLE, 'file is not accessible');
            next();
        }
    ];

    protected validator: ValidationChain[] = [
        param('role')
            .exists().withMessage('required')
            .isIn(['subscriber', 'administrator', 'contributor', 'editor', 'superAdmin', 'unverified'])
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new FileProtection();