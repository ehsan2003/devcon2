import {Roles} from "@shared/utils";
import {NextFunction, RequestHandler, Router} from "express";

import passport from "passport";
import {AccessForbiddenError, ConflictError, UnprocessableEntity} from "@shared/errors";
import {types as utilTypes} from 'util';
import {ValidationChain, validationResult} from "express-validator";
import {mongo} from "mongoose";

export abstract class BaseController<LocalRequestHandler extends RequestHandler<any, { msg: string }, any, any>> {
    public abstract readonly method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
    /**
     * indicates minimum role to access this route
     */
    public abstract readonly access: Roles | null;
    public abstract readonly path: string;
    protected exactAccess: boolean = false;
    /**
     * main Router middleware
     */
    protected abstract middleware: LocalRequestHandler[];
    protected abstract validator?: ValidationChain[];
    /**
     * finally used middleware to handle requests
     */
    private finalMiddleware: LocalRequestHandler[] = [];
    private router: Router = Router();

    protected HandleUniqueError(message: string): (err: Error) => never {
        return (err: Error) => {
            if (err instanceof mongo.MongoError && err.code === 11000)
                throw new ConflictError(message);
            else
                throw err;
        }
    }

    private static constructValidator = (validations: ValidationChain[]) => async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const result = validationResult(req);
        if (result.isEmpty())
            return next();
        next(new UnprocessableEntity('validation failed', result.array()));
    };

    public getRouter() {
        return this.router;

    }

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
}