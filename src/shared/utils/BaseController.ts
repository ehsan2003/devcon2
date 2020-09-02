import {Roles} from "@shared/utils";
import {RequestHandler, Router} from "express";

import passport from "passport";
import {AccessForbiddenError, ConflictError, UnprocessableEntity} from "@shared/errors";
import {types as utilTypes} from 'util';
import {ValidationChain, validationResult} from "express-validator";
import {mongo} from "mongoose";
import {Middleware} from "express-validator/src/base";

export abstract class BaseController<LocalRequestHandler extends RequestHandler<any, { msg: string }, any, any>> {
    public abstract readonly method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
    protected readonly middlewareBeforeValidate: LocalRequestHandler[] = [];
    /**
     * indicates minimum role to access this route
     */
    public readonly access: Roles | null = null;
    public readonly path: string | RegExp | (string | RegExp)[] = '/';
    protected exactAccess: boolean = false;
    /**
     * main Router middleware
     */
    protected abstract middleware: LocalRequestHandler[];
    protected validator?: ValidationChain[] | Middleware;
    /**
     * finally used middleware to handle requests
     */
    private finalMiddleware: LocalRequestHandler[] = [];
    private router: Router = Router();

    protected handleUniqueError(message: string): (err: Error) => never {
        return (err: Error) => {
            if (err instanceof mongo.MongoError && err.code === 11000)
                throw new ConflictError(message);
            else
                throw err;
        };
    }


    public getRouter() {
        return this.router;

    }

    protected initialize() {
        this.router = Router();
        this.setMiddleware();
        this.setRouter();
    }

    private handleValidation(options?: { onlyFirstError?: boolean }) {
        return ((req, res, next) => {
            const validation = validationResult(req);
            if (!validation.isEmpty())
                return next(new UnprocessableEntity('validation failed', validation.array(options)));
            next();
        }) as LocalRequestHandler;
    }

    private setMiddleware() {
        this.sanitizeCustomMiddleware();
        this.finalMiddleware = [
            ...(this.access !== null && this.access >= 0 ? [passport.authenticate('jwt', {session: false}), this.constructAccessChecker()] : []),
            ...(this.access === Roles.anonymous ? [passport.authenticate(['jwt', 'anonymous'], {session: false})] : []),
            ...this.middlewareBeforeValidate,
            ...(this.validator ? [(this.validator), this.handleValidation()] : []),
            ...this.middleware
        ];
    }

    private constructAccessChecker(): LocalRequestHandler {
        return ((req, res, next) => {
            const user = req.user || {role: -1};
            if (this.exactAccess ? user.role !== this.access : (user.role < (this.access as Roles)))
                next(new AccessForbiddenError('access denied'));
            next();
        }) as LocalRequestHandler;
    }

    private sanitizeCustomMiddleware() {
        this.middleware = this.middleware.map((middleware): LocalRequestHandler => {
            if (utilTypes.isAsyncFunction(middleware))
                return ((req, res, next) => middleware(req, res, next).catch(next)) as LocalRequestHandler;
            return middleware;
        });
    }

    private setRouter() {
        this.router[this.method](this.path, ...this.finalMiddleware);
    }
}