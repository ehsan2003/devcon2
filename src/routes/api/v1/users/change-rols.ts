import {BaseController, Roles, secureUserInfo} from "@shared/utils";
import {RequestHandler} from "express";
import {body, param, ValidationChain} from "express-validator";
import User, {IUserDoc} from "@models/User";
import {AccessForbiddenError, NotFoundError} from "@shared/errors";

export type UsersChangeRolsRequestHandler = RequestHandler<{ id: string }, { msg: string, result: ReturnType<typeof secureUserInfo> }, {
    newRole: Roles;
}, {}>;

class ChangeRoles extends BaseController<UsersChangeRolsRequestHandler> {

    readonly access = Roles.editor;
    readonly method = 'put';
    readonly path = '/:id';
    readonly allowedChanges = {
        [Roles.anonymous]: -2,
        [Roles.unverified]: -2,
        [Roles.subscriber]: -2,
        [Roles.contributor]: -2,
        [Roles.author]: -2,
        [Roles.editor]: Roles.author,
        [Roles.administrator]: Roles.editor,
        [Roles.superAdmin]: Roles.administrator
    };
    protected middleware: UsersChangeRolsRequestHandler[]
        = [
        async (req, res) => {
            const user = req.user as IUserDoc;
            if (this.allowedChanges[user.role] < req.body.newRole)
                throw new AccessForbiddenError('access forbidden');
            const modifiedUser = await User.findById(req.params.id);
            if (!modifiedUser)
                throw new NotFoundError('user not found');
            res.json({msg: 'success', result: secureUserInfo(modifiedUser)});
        }

    ];

    protected validator: ValidationChain[] = [
        param('id')
            .exists().withMessage('required')
            .isMongoId().withMessage('invalid mongo id'),
        body('newRole')
            .exists().withMessage('required')
            .isIn([
                Roles.subscriber,
                Roles.contributor,
                Roles.author,
                Roles.editor,
                Roles.administrator,
                Roles.superAdmin
            ])
    ];

    constructor() {
        super();
        this.initialize();
    }
}

export default new ChangeRoles();