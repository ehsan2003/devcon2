import {Roles} from "@shared/utils";
import {NextFunction, RequestHandler, Router} from "express";

import passport from "passport";
import {AccessForbiddenError, UnprocessableEntity} from "@shared/errors";
import {types as utilTypes} from 'util';
import {ValidationChain, validationResult} from "express-validator";

export abstract class BaseController<LocalRequestHandler extends RequestHandler<any, any, any, any>> {
    public abstract readonly method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
    protected exactAccess: boolean = false;
    /**
     * indicates minimum role to access this route
     */
    public abstract readonly access: Roles | null;
    /**
     * finally used middleware to handle requests
     */
    private finalMiddleware: LocalRequestHandler[] = [];
    /**
     * main Router middleware
     */
    protected abstract middleware: LocalRequestHandler[];
    public abstract readonly path: string;
    private router: Router = Router();
    protected abstract validator?: ValidationChain[];

    protected initialize() {
        this.router = Router();
        this.setMiddleware()
        this.setRouter()
    }

    private setMiddleware() {
        this.sanitizeCustomMiddleware()
        this.finalMiddleware = [
            ...(this.validator ? [BaseController.constructValidator(this.validator)] : []),
            ...(this.access !== null && this.access >= 0 ? [passport.authenticate('jwt', {session: false}), this.constructAccessChecker()] : []),
            ...(this.access === Roles.anonymous ? [passport.authenticate(['jwt', 'anonymous'], {session: false})] : []),
            ...this.middleware
        ]
    }

    public getRouter() {
        return this.router;

    }

    private constructAccessChecker(): LocalRequestHandler {
        return <LocalRequestHandler>((req, res, next) => {
            const user = req.user || {role: -1};
            if (this.exactAccess ? user.role != this.access : (user.role < (this.access as Roles)))
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
        this.router[this.method](this.path, ...this.finalMiddleware);
    }


    private static constructValidator = (validations: ValidationChain[]) => async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const result = validationResult(req);
        if (result.isEmpty())
            return next();
        next(new UnprocessableEntity('validation failed', result.array()));
    };
}