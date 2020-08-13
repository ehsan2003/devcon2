import {Roles} from "@shared/utils/roles";
import {NextFunction, RequestHandler, Router} from "express";
import passport from "passport";
import {IUserDoc} from "@models/User";
import {AccessForbiddenError} from "@shared/errors";
import {types as utilTypes} from 'util';
import {ValidationChain, validationResult} from "express-validator";
import validationMiddleware from "../../../../devcon/src/shared/validationMiddleware";
import {ValidationError} from "../../../../devcon/src/shared/errors";

export abstract class BaseController<LocalRequestHandler extends RequestHandler> {
    /**
     * indicates minimum role to access this route
     */
    public abstract readonly access?: Roles | -1 = -1;
    /**
     * finally used middleware to handle requests
     */
    private finalMiddleware: LocalRequestHandler[] = [];
    /**
     * main Router middleware
     */
    protected abstract middleware: LocalRequestHandler[];
    public abstract readonly path: string;
    private readonly router: Router;
    protected abstract validator?: ValidationChain[];

    private setMiddleware() {
        this.finalMiddleware = [
            ...(this.validator ? [BaseController.constructValidator(this.validator)] : []),
            ...(this.access && this.access >= 0 ? [passport.authenticate('jwt', {session: false}), this.constructAccessChecker()] : []),
            ...(this.access && this.access === Roles.anonymous ? [passport.authenticate(['jwt', 'anonymous'], {session: false})] : [])
        ]
    }

    public getRouter() {
        return this.router;
    }

    private constructAccessChecker(): LocalRequestHandler {
        return <LocalRequestHandler>((req, res, next) => {
            const user = req.user || {role: -1};
            if (user.role < (this.access as Roles))
                next(new AccessForbiddenError('access denied'));
            next();
        })
    }

    private sanitizeCustomMiddleware() {
        this.middleware = this.middleware.map((middleware): LocalRequestHandler => {
            if (utilTypes.isAsyncFunction(middleware))
                return <LocalRequestHandler>((req, res, next) => middleware(req, res, next).catch(next))
            return middleware;
        })
    }

    private setRouter() {
        this.router.use(this.path, ...this.finalMiddleware);
    }

    protected constructor() {
        this.sanitizeCustomMiddleware()
        this.router = Router();
        this.setMiddleware()
        this.setRouter()
    }

    private static constructValidator = (validations: ValidationChain[]) => async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const result = validationResult(req);
        if (result.isEmpty())
            return next();
        next(new ValidationError('validation failed', result.array()));
    };
}